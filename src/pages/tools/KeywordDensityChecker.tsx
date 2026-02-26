import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';

export default function KeywordDensityChecker() {
  const [text, setText] = useState('');

  const density = useMemo(() => {
    if (!text.trim()) return [];
    
    const words = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w.length > 2);
    const totalWords = words.length;
    
    if (totalWords === 0) return [];

    const counts: Record<string, number> = {};
    words.forEach(w => {
      counts[w] = (counts[w] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([word, count]) => ({
        word,
        count,
        density: ((count / totalWords) * 100).toFixed(2)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20); // Top 20 words
  }, [text]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Keyword Density Checker</h1>
        <p className="text-slate-500 dark:text-slate-400">Analyze your text to find the most frequently used keywords.</p>
      </div>

      <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Paste your content here
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white resize-none"
          placeholder="Start typing or paste your article..."
        />
      </div>

      {density.length > 0 && (
        <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                  <th className="px-6 py-3 text-sm font-semibold text-slate-900 dark:text-white">Keyword</th>
                  <th className="px-6 py-3 text-sm font-semibold text-slate-900 dark:text-white">Count</th>
                  <th className="px-6 py-3 text-sm font-semibold text-slate-900 dark:text-white">Density</th>
                </tr>
              </thead>
              <tbody>
                {density.map((item, idx) => (
                  <tr key={idx} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-900/50">
                    <td className="px-6 py-3 text-sm font-medium text-slate-900 dark:text-slate-200">{item.word}</td>
                    <td className="px-6 py-3 text-sm text-slate-600 dark:text-slate-400">{item.count}</td>
                    <td className="px-6 py-3 text-sm text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                        <span>{item.density}%</span>
                        <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-500" 
                            style={{ width: `${Math.min(parseFloat(item.density) * 5, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  );
}
