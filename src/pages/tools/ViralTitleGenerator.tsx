import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Copy, CheckCircle2, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export default function ViralTitleGenerator() {
  const [topic, setTopic] = useState('');
  const [titles, setTitles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateTitles = async () => {
    if (!topic.trim()) return;
    
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Topic: ${topic}`,
        config: {
          systemInstruction: "You are an expert YouTube strategist. Generate 5 highly engaging, click-worthy YouTube video titles based on the user's topic. Return ONLY the titles, one per line.",
        }
      });
      
      if (response.text) {
        const generatedTitles = response.text.split('\n').filter((t: string) => t.trim().length > 0);
        setTitles(generatedTitles);
      }
      
      // Record usage
      fetch('/api/usage/viral-title', { method: 'POST' }).catch(() => {});
    } catch (error) {
      console.error(error);
      alert('Failed to generate titles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text.replace(/^[\d\.\-\*]+\s*/, ''));
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Viral Title Generator</h1>
        <p className="text-slate-500 dark:text-slate-400">Generate click-worthy, high-CTR titles for your YouTube videos using AI.</p>
      </div>

      <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="space-y-4">
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Video Topic or Keyword
            </label>
            <input
              id="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., How to start a faceless YouTube channel in 2024"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all dark:text-white"
              onKeyDown={(e) => e.key === 'Enter' && generateTitles()}
            />
          </div>
          
          <button
            onClick={generateTitles}
            disabled={loading || !topic.trim()}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 dark:disabled:bg-indigo-800 text-white py-3 px-4 rounded-xl font-medium transition-colors"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
            {loading ? 'Generating Magic...' : 'Generate Viral Titles'}
          </button>
        </div>
      </div>

      {titles.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Generated Titles</h2>
          <div className="grid gap-3">
            {titles.map((title, idx) => {
              const cleanTitle = title.replace(/^[\d\.\-\*]+\s*/, '');
              return (
                <div key={idx} className="flex items-center justify-between p-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors group">
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{cleanTitle}</span>
                  <button
                    onClick={() => copyToClipboard(title, idx)}
                    className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"
                    title="Copy to clipboard"
                  >
                    {copiedIndex === idx ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <Copy className="h-5 w-5" />}
                  </button>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
