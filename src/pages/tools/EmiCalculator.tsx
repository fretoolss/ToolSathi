import React, { useState } from 'react';
import { motion } from 'motion/react';

export default function EmiCalculator() {
  const [amount, setAmount] = useState('100000');
  const [rate, setRate] = useState('10');
  const [tenure, setTenure] = useState('12');

  const calculateEMI = () => {
    const p = parseFloat(amount);
    const r = parseFloat(rate) / 12 / 100;
    const n = parseFloat(tenure);

    if (!p || !r || !n) return null;

    const emi = p * r * (Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1));
    const totalAmount = emi * n;
    const totalInterest = totalAmount - p;

    return {
      emi: emi.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalAmount: totalAmount.toFixed(2)
    };
  };

  const result = calculateEMI();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">EMI Calculator</h1>
        <p className="text-slate-500 dark:text-slate-400">Calculate your monthly loan EMI and total interest payable.</p>
      </div>

      <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Loan Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Interest Rate (% p.a.)</label>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tenure (Months)</label>
              <input
                type="number"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
              />
            </div>
          </div>
        </div>

        {result && (
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl border border-indigo-100 dark:border-indigo-500/20 text-center md:col-span-3">
              <h3 className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-1">Monthly EMI</h3>
              <div className="text-4xl font-black text-indigo-700 dark:text-indigo-300">${result.emi}</div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Principal Amount</h3>
              <div className="text-lg font-bold text-slate-900 dark:text-white">${amount}</div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Total Interest</h3>
              <div className="text-lg font-bold text-slate-900 dark:text-white">${result.totalInterest}</div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Total Amount</h3>
              <div className="text-lg font-bold text-slate-900 dark:text-white">${result.totalAmount}</div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
