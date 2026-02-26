import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AlignLeft, Copy, CheckCircle2, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export default function MetaDescriptionGenerator() {
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateMeta = async () => {
    if (!topic.trim()) return;
    
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Topic/Keyword: ${topic}`,
        config: {
          systemInstruction: "You are an SEO expert. Generate a compelling, click-optimized meta description (under 160 characters) for the given topic or keyword.",
        }
      });
      
      if (response.text) {
        setDescription(response.text.trim());
      }
      
      fetch('/api/usage/meta-description', { method: 'POST' }).catch(() => {});
    } catch (error) {
      console.error(error);
      alert('Failed to generate meta description.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(description);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Meta Description Generator</h1>
        <p className="text-slate-500 dark:text-slate-400">Generate SEO-optimized meta descriptions under 160 characters.</p>
      </div>

      <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Page Topic or Target Keyword
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Best running shoes for flat feet 2024"
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
            onKeyDown={(e) => e.key === 'Enter' && generateMeta()}
          />
        </div>
        
        <button
          onClick={generateMeta}
          disabled={loading || !topic.trim()}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 dark:disabled:bg-indigo-800 text-white py-3 px-4 rounded-xl font-medium transition-colors"
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <AlignLeft className="h-5 w-5" />}
          {loading ? 'Generating...' : 'Generate Meta Description'}
        </button>
      </div>

      {description && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Result <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${description.length > 160 ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'}`}>{description.length} chars</span>
            </h3>
            <button
              onClick={copyToClipboard}
              className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"
            >
              {copied ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <Copy className="h-5 w-5" />}
            </button>
          </div>
          <p className="text-slate-900 dark:text-slate-200 text-lg leading-relaxed">
            {description}
          </p>
          
          {/* Google Search Preview */}
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Google Search Preview</h4>
            <div className="max-w-[600px]">
              <div className="text-sm text-[#202124] dark:text-[#dadce0] truncate">https://yourwebsite.com › {topic.toLowerCase().replace(/\s+/g, '-')}</div>
              <div className="text-xl text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer truncate mt-1">Your Page Title Here - Your Brand</div>
              <div className="text-sm text-[#4d5156] dark:text-[#bdc1c6] mt-1 line-clamp-2">{description}</div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
