import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Zap, Copy, CheckCircle2, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { SEO } from '../../components/seo';

export default function ShortsHookGenerator() {
  const [topic, setTopic] = useState('');
  const [hooks, setHooks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateHooks = async () => {
    if (!topic.trim()) return;
    
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Topic: ${topic}`,
        config: {
          systemInstruction: "You are an expert short-form video producer (TikTok, YouTube Shorts, Instagram Reels). Generate 5 highly engaging, attention-grabbing hooks (the first 3 seconds of the script) for a video about the user's topic. These should create curiosity, use pattern interrupts, or state a bold claim. Return ONLY the hooks, one per line.",
        }
      });
      
      if (response.text) {
        const generatedHooks = response.text.split('\n').filter((t: string) => t.trim().length > 0);
        setHooks(generatedHooks);
      }
      
      fetch('/api/usage/shorts-hook', { method: 'POST' }).catch(() => {});
    } catch (error) {
      console.error(error);
      alert('Failed to generate hooks. Please try again.');
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
    <>
      <SEO 
        title="Viral Shorts & Reels Hook Generator" 
        description="Generate viral 3-second hooks for your YouTube Shorts, TikToks, and Instagram Reels using AI."
        keywords="shorts hook generator, tiktok hook generator, reels hook generator, viral hooks, video hooks"
        canonicalUrl="https://toolsathi.com/youtube/shorts-hook"
      />
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Shorts Hook Generator</h1>
        <p className="text-slate-500 dark:text-slate-400">Generate viral 3-second hooks for YouTube Shorts, TikTok, and Reels.</p>
      </div>

      <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="space-y-4">
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Video Topic or Concept
            </label>
            <input
              id="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., How to lose weight without giving up pizza"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all dark:text-white"
              onKeyDown={(e) => e.key === 'Enter' && generateHooks()}
            />
          </div>
          
          <button
            onClick={generateHooks}
            disabled={loading || !topic.trim()}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 dark:disabled:bg-indigo-800 text-white py-3 px-4 rounded-xl font-medium transition-colors"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Zap className="h-5 w-5" />}
            {loading ? 'Generating Hooks...' : 'Generate Viral Hooks'}
          </button>
        </div>
      </div>

      {hooks.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Generated Hooks</h2>
          <div className="grid gap-3">
            {hooks.map((hook, idx) => {
              const cleanHook = hook.replace(/^[\d\.\-\*]+\s*/, '');
              return (
                <div key={idx} className="flex items-center justify-between p-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors group">
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{cleanHook}</span>
                  <button
                    onClick={() => copyToClipboard(hook, idx)}
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
    </>
  );
}
