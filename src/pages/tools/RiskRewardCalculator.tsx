import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator } from 'lucide-react';

export default function RiskRewardCalculator() {
  const [entryPrice, setEntryPrice] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');

  const calculateRR = () => {
    const entry = parseFloat(entryPrice);
    const sl = parseFloat(stopLoss);
    const tp = parseFloat(takeProfit);

    if (!entry || !sl || !tp) return null;

    const risk = Math.abs(entry - sl);
    const reward = Math.abs(tp - entry);
    
    if (risk === 0) return null;
    
    const ratio = reward / risk;
    return ratio.toFixed(2);
  };

  const rr = calculateRR();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Risk Reward Calculator</h1>
        <p className="text-slate-500 dark:text-slate-400">Calculate your potential risk vs reward before entering a trade.</p>
      </div>

      <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Entry Price</label>
            <input
              type="number"
              value={entryPrice}
              onChange={(e) => setEntryPrice(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
              placeholder="e.g. 50000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Stop Loss</label>
            <input
              type="number"
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
              placeholder="e.g. 49000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Take Profit</label>
            <input
              type="number"
              value={takeProfit}
              onChange={(e) => setTakeProfit(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
              placeholder="e.g. 53000"
            />
          </div>
        </div>

        {rr && (
          <div className="mt-6 p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Risk : Reward Ratio</h3>
            <div className="text-4xl font-black text-indigo-600 dark:text-indigo-400">
              1 : {rr}
            </div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {parseFloat(rr) >= 2 ? 'Good setup! (R:R >= 1:2)' : 'Consider a better setup. (R:R < 1:2)'}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
