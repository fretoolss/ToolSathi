import React, { useState } from 'react';
import { motion } from 'motion/react';

export default function PercentageCalculator() {
  const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState('');
  
  const [val3, setVal3] = useState('');
  const [val4, setVal4] = useState('');

  const [val5, setVal5] = useState('');
  const [val6, setVal6] = useState('');

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Percentage Calculator</h1>
        <p className="text-slate-500 dark:text-slate-400">Quickly calculate percentages for various scenarios.</p>
      </div>

      <div className="space-y-6">
        {/* Type 1 */}
        <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center gap-4">
          <span className="text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap">What is</span>
          <input type="number" value={val1} onChange={e => setVal1(e.target.value)} className="w-24 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg outline-none dark:text-white" />
          <span className="text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap">% of</span>
          <input type="number" value={val2} onChange={e => setVal2(e.target.value)} className="w-32 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg outline-none dark:text-white" />
          <span className="text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap">?</span>
          <div className="ml-auto w-full md:w-auto text-center md:text-right">
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {val1 && val2 ? ((parseFloat(val1) / 100) * parseFloat(val2)).toFixed(2) : '-'}
            </span>
          </div>
        </div>

        {/* Type 2 */}
        <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center gap-4">
          <input type="number" value={val3} onChange={e => setVal3(e.target.value)} className="w-32 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg outline-none dark:text-white" />
          <span className="text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap">is what % of</span>
          <input type="number" value={val4} onChange={e => setVal4(e.target.value)} className="w-32 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg outline-none dark:text-white" />
          <span className="text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap">?</span>
          <div className="ml-auto w-full md:w-auto text-center md:text-right">
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {val3 && val4 && parseFloat(val4) !== 0 ? ((parseFloat(val3) / parseFloat(val4)) * 100).toFixed(2) + '%' : '-'}
            </span>
          </div>
        </div>

        {/* Type 3 */}
        <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center gap-4">
          <span className="text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap">Percentage change from</span>
          <input type="number" value={val5} onChange={e => setVal5(e.target.value)} className="w-32 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg outline-none dark:text-white" />
          <span className="text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap">to</span>
          <input type="number" value={val6} onChange={e => setVal6(e.target.value)} className="w-32 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg outline-none dark:text-white" />
          <div className="ml-auto w-full md:w-auto text-center md:text-right">
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {val5 && val6 && parseFloat(val5) !== 0 ? (((parseFloat(val6) - parseFloat(val5)) / Math.abs(parseFloat(val5))) * 100).toFixed(2) + '%' : '-'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
