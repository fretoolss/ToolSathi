import React from 'react';
import { motion } from 'motion/react';

export default function AboutUs() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">About ToolSathi</h1>
        <p className="text-slate-500 dark:text-slate-400">Empowering creators and professionals with smart tools.</p>
      </div>
      <div className="bg-white dark:bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Our Mission</h2>
          <p>At ToolSathi, our mission is to provide high-quality, easy-to-use tools for YouTubers, traders, SEO professionals, and everyday users. We believe that having the right tools can significantly boost productivity and success.</p>
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Who We Are</h2>
          <p>We are a team of passionate developers, designers, and digital marketers who understand the challenges of the modern digital landscape. We built ToolSathi to solve the problems we faced in our own daily workflows.</p>
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">What We Offer</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-slate-900 dark:text-white">YouTube Tools:</strong> AI-powered title generators, tag generators, and thumbnail analyzers to help you grow your channel.</li>
            <li><strong className="text-slate-900 dark:text-white">Trading Tools:</strong> Calculators for risk-reward, position sizing, and crypto profits to help you make informed trading decisions.</li>
            <li><strong className="text-slate-900 dark:text-white">SEO Tools:</strong> Keyword density checkers and meta description generators to optimize your content for search engines.</li>
            <li><strong className="text-slate-900 dark:text-white">Utility Tools:</strong> Everyday calculators and converters to make your life easier.</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
