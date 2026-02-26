import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Image as ImageIcon, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { GoogleGenAI } from '@google/genai';

export default function ThumbnailAnalyzer() {
  const [headline, setHeadline] = useState('');
  const [result, setResult] = useState<{ score: number; tips: string[] } | null>(null);
  const [loading, setLoading] = useState(false);

  const analyzeHeadline = async () => {
    if (!headline.trim()) return;
    
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Headline: "${headline}"`,
        config: {
          systemInstruction: "You are an expert YouTube thumbnail designer and CTR analyst. Analyze the given headline for a thumbnail. Provide a score out of 100 for CTR potential, and 3 brief tips to improve it. Format as JSON with 'score' (number) and 'tips' (array of strings).",
          responseMimeType: "application/json",
        }
      });
      
      if (response.text) {
        // Parse JSON from markdown block if present
        let jsonStr = response.text;
        if (jsonStr.includes('```json')) {
          jsonStr = jsonStr.split('```json')[1].split('```')[0].trim();
        } else if (jsonStr.includes('```')) {
          jsonStr = jsonStr.split('```')[1].split('```')[0].trim();
        }
        
        try {
          const parsed = JSON.parse(jsonStr);
          setResult(parsed);
        } catch (e) {
          console.error("Failed to parse JSON", jsonStr);
          alert("Failed to parse AI response.");
        }
      }
      
      fetch('/api/usage/thumbnail-ctr', { method: 'POST' }).catch(() => {});
    } catch (error) {
      console.error(error);
      alert('Failed to analyze headline.');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Thumbnail CTR Analyzer</h1>
        <p className="text-slate-500 dark:text-slate-400">Predict the Click-Through Rate (CTR) potential of your thumbnail text.</p>
      </div>

      <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="space-y-4">
          <div>
            <label htmlFor="headline" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Thumbnail Text / Headline
            </label>
            <input
              id="headline"
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="e.g., I Tried Day Trading For 30 Days"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all dark:text-white"
              onKeyDown={(e) => e.key === 'Enter' && analyzeHeadline()}
            />
          </div>
          
          <button
            onClick={analyzeHeadline}
            disabled={loading || !headline.trim()}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 dark:disabled:bg-indigo-800 text-white py-3 px-4 rounded-xl font-medium transition-colors"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ImageIcon className="h-5 w-5" />}
            {loading ? 'Analyzing...' : 'Analyze CTR Potential'}
          </button>
        </div>
      </div>

      {result && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">CTR Potential Score</h3>
            <div className={cn("text-6xl font-black tracking-tighter mb-2", getScoreColor(result.score))}>
              {result.score}
              <span className="text-2xl text-slate-400 font-normal">/100</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {result.score >= 80 ? "Excellent! Highly clickable." : result.score >= 60 ? "Good, but could be punchier." : "Needs improvement."}
            </p>
          </div>
          
          <div className="md:col-span-2 bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-indigo-500" />
              Improvement Tips
            </h3>
            <ul className="space-y-3">
              {result.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-sm font-medium mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-slate-700 dark:text-slate-300">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
