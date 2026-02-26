import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Tags, Copy, CheckCircle2, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export default function TagGenerator() {
  const [topic, setTopic] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateTags = async () => {
    if (!topic.trim()) return;
    
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Topic: ${topic}`,
        config: {
          systemInstruction: "You are an expert YouTube SEO specialist. Generate 20 highly relevant, high-search-volume YouTube tags for the given topic. Return them as a comma-separated list.",
        }
      });
      
      if (response.text) {
        const generatedTags = response.text.split(',').map((t: string) => t.trim()).filter(Boolean);
        setTags(generatedTags);
      }
      
      fetch('/api/usage/tags', { method: 'POST' }).catch(() => {});
    } catch (error) {
      console.error(error);
      alert('Failed to generate tags.');
    } finally {
      setLoading(false);
    }
  };

  const copyAllTags = () => {
    navigator.clipboard.writeText(tags.join(', '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">YouTube Tag Generator</h1>
        <p className="text-slate-500 dark:text-slate-400">Generate SEO-optimized tags to rank your videos higher in search results.</p>
      </div>

      <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="space-y-4">
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Video Topic or Main Keyword
            </label>
            <input
              id="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., React JS Tutorial for Beginners"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all dark:text-white"
              onKeyDown={(e) => e.key === 'Enter' && generateTags()}
            />
          </div>
          
          <button
            onClick={generateTags}
            disabled={loading || !topic.trim()}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 dark:disabled:bg-indigo-800 text-white py-3 px-4 rounded-xl font-medium transition-colors"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Tags className="h-5 w-5" />}
            {loading ? 'Finding Best Tags...' : 'Generate Tags'}
          </button>
        </div>
      </div>

      {tags.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Generated Tags ({tags.length})</h2>
            <button
              onClick={copyAllTags}
              className="flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
            >
              {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied All!' : 'Copy All'}
            </button>
          </div>
          
          <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1.5 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-sm rounded-lg border border-slate-200 dark:border-slate-800"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <p className="text-sm text-slate-600 dark:text-slate-400 font-mono break-all">
                {tags.join(', ')}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
