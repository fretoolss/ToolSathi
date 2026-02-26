import React from 'react';
import { toolsList } from './Dashboard';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function YoutubeTools() {
  const category = toolsList.find(c => c.category === 'YouTube Tools');
  
  if (!category) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">YouTube Tools</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Grow your channel with AI-powered tools.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.tools.map(tool => {
          const Icon = tool.icon;
          return (
            <Link 
              key={tool.name} 
              to={tool.path}
              className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-500/50 transition-all group"
            >
              <div className="bg-red-50 dark:bg-red-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon className="h-6 w-6 text-red-500" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{tool.name}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">{tool.desc}</p>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}
