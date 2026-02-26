import React from 'react';
import { motion } from 'motion/react';

export default function TermsOfService() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Terms of Service</h1>
        <p className="text-slate-500 dark:text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
      </div>
      <div className="bg-white dark:bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">1. Acceptance of Terms</h2>
          <p>By accessing or using ToolSathi, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">2. Use License</h2>
          <p>Permission is granted to temporarily download one copy of the materials on ToolSathi's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">3. Disclaimer</h2>
          <p>The materials on ToolSathi's website are provided on an 'as is' basis. ToolSathi makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">4. Limitations</h2>
          <p>In no event shall ToolSathi or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ToolSathi's website.</p>
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">5. Revisions and Errata</h2>
          <p>The materials appearing on ToolSathi's website could include technical, typographical, or photographic errors. ToolSathi does not warrant that any of the materials on its website are accurate, complete, or current.</p>
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">6. Governing Law</h2>
          <p>These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
        </div>
      </div>
    </motion.div>
  );
}
