import React from 'react';
import { motion } from 'motion/react';

export default function Disclaimer() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Disclaimer</h1>
        <p className="text-slate-500 dark:text-slate-400">Important information regarding the use of our tools.</p>
      </div>
      <div className="bg-white dark:bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Financial Disclaimer</h2>
          <p className="mb-2">The trading and cryptocurrency tools provided on ToolSathi (including but not limited to the Risk Reward Calculator, Position Size Calculator, Crypto Profit Calculator, and Compounding Calculator) are for educational and informational purposes only.</p>
          <p className="mb-2"><strong className="text-slate-900 dark:text-white">They do not constitute financial advice, investment advice, or trading advice.</strong></p>
          <p>Trading in financial markets, including stocks, forex, and cryptocurrencies, involves a high degree of risk and may not be suitable for all investors. You could lose some or all of your initial investment. Always conduct your own research and consult with a qualified financial advisor before making any investment decisions.</p>
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">AI Generation Disclaimer</h2>
          <p className="mb-2">Our AI-powered tools (Viral Title Generator, Tag Generator, Thumbnail Analyzer, Meta Description Generator) use artificial intelligence to generate content. While we strive for high quality, the generated content may not always be accurate, appropriate, or optimal.</p>
          <p>You are solely responsible for reviewing, editing, and verifying any AI-generated content before using it for your own purposes.</p>
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">General Disclaimer</h2>
          <p>ToolSathi provides these tools "as is" without any warranties. We are not liable for any losses or damages arising from the use of our website or tools.</p>
        </div>
      </div>
    </motion.div>
  );
}
