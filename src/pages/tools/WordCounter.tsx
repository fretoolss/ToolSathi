import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';

export default function WordCounter() {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0).length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const readingTime = Math.ceil(words / 200); // Avg 200 words per min

    return { words, chars, charsNoSpaces, paragraphs, sentences, readingTime };
  }, [text]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Word Counter</h1>
        <p className="text-slate-500 dark:text-slate-400">Count words, characters, sentences, and estimate reading time.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Words', value: stats.words },
          { label: 'Characters', value: stats.chars },
          { label: 'No Spaces', value: stats.charsNoSpaces },
          { label: 'Sentences', value: stats.sentences },
          { label: 'Paragraphs', value: stats.paragraphs },
          { label: 'Read Time', value: `${stats.readingTime}m` },
        ].map(stat => (
          <div key={stat.label} className="bg-white dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
            <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">{stat.label}</h3>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={15}
          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white resize-none"
          placeholder="Start typing or paste your text here..."
        />
      </div>
    </motion.div>
  );
}
