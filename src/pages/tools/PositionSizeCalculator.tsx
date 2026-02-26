import React, { useState } from 'react';
import { motion } from 'motion/react';

export default function PositionSizeCalculator() {
  const [accountSize, setAccountSize] = useState('');
  const [riskPercent, setRiskPercent] = useState('1');
  const [entryPrice, setEntryPrice] = useState('');
  const [stopLoss, setStopLoss] = useState('');

  const calculatePosition = () => {
    const acc = parseFloat(accountSize);
    const risk = parseFloat(riskPercent);
    const entry = parseFloat(entryPrice);
    const sl = parseFloat(stopLoss);

    if (!acc || !risk || !entry || !sl) return null;

    const riskAmount = acc * (risk / 100);
    const priceDiff = Math.abs(entry - sl);
    
    if (priceDiff === 0) return null;
    
    const positionSize = riskAmount / priceDiff;
    const totalValue = positionSize * entry;
    const leverage = totalValue / acc;

    return {
      riskAmount: riskAmount.toFixed(2),
      positionSize: positionSize.toFixed(4),
      totalValue: totalValue.toFixed(2),
      leverage: leverage.toFixed(2)
    };
  };

  const result = calculatePosition();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Position Size Calculator</h1>
        <p className="text-slate-500 dark:text-slate-400">Calculate exact position size based on your risk tolerance.</p>
      </div>

      <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Account Size ($)</label>
            <input
              type="number"
              value={accountSize}
              onChange={(e) => setAccountSize(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
              placeholder="10000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Risk (%)</label>
            <input
              type="number"
              value={riskPercent}
              onChange={(e) => setRiskPercent(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
              placeholder="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Entry Price</label>
            <input
              type="number"
              value={entryPrice}
              onChange={(e) => setEntryPrice(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
              placeholder="50000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Stop Loss</label>
            <input
              type="number"
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
              placeholder="49000"
            />
          </div>
        </div>

        {result && (
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Amount at Risk</h3>
              <div className="text-xl font-bold text-red-500">${result.riskAmount}</div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Position Size (Units)</h3>
              <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{result.positionSize}</div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Total Position Value</h3>
              <div className="text-xl font-bold text-slate-900 dark:text-white">${result.totalValue}</div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Effective Leverage</h3>
              <div className="text-xl font-bold text-slate-900 dark:text-white">{result.leverage}x</div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
