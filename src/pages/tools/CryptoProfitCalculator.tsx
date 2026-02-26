import React, { useState } from 'react';
import { motion } from 'motion/react';

export default function CryptoProfitCalculator() {
  const [investment, setInvestment] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [feePercent, setFeePercent] = useState('0.1'); // Default exchange fee

  const calculateProfit = () => {
    const inv = parseFloat(investment);
    const buy = parseFloat(buyPrice);
    const sell = parseFloat(sellPrice);
    const fee = parseFloat(feePercent) / 100;

    if (!inv || !buy || !sell) return null;

    const coinsBought = inv / buy;
    const buyFee = inv * fee;
    const actualInvestment = inv - buyFee;
    
    const grossReturn = coinsBought * sell;
    const sellFee = grossReturn * fee;
    const netReturn = grossReturn - sellFee;
    
    const profit = netReturn - inv;
    const roi = (profit / inv) * 100;

    return {
      profit: profit.toFixed(2),
      roi: roi.toFixed(2),
      netReturn: netReturn.toFixed(2),
      totalFees: (buyFee + sellFee).toFixed(2)
    };
  };

  const result = calculateProfit();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Crypto Profit Calculator</h1>
        <p className="text-slate-500 dark:text-slate-400">Calculate your potential crypto gains including exchange fees.</p>
      </div>

      <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Investment Amount ($)</label>
            <input
              type="number"
              value={investment}
              onChange={(e) => setInvestment(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
              placeholder="1000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Exchange Fee (%)</label>
            <input
              type="number"
              value={feePercent}
              onChange={(e) => setFeePercent(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
              placeholder="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Buy Price ($)</label>
            <input
              type="number"
              value={buyPrice}
              onChange={(e) => setBuyPrice(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
              placeholder="50000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Sell Price ($)</label>
            <input
              type="number"
              value={sellPrice}
              onChange={(e) => setSellPrice(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
              placeholder="60000"
            />
          </div>
        </div>

        {result && (
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="col-span-2 p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Net Profit/Loss</h3>
              <div className={`text-4xl font-black ${parseFloat(result.profit) >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                ${result.profit}
              </div>
              <div className={`mt-2 text-sm font-medium ${parseFloat(result.roi) >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                {parseFloat(result.roi) >= 0 ? '+' : ''}{result.roi}% ROI
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Total Return</h3>
              <div className="text-xl font-bold text-slate-900 dark:text-white">${result.netReturn}</div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Total Fees Paid</h3>
              <div className="text-xl font-bold text-amber-500">${result.totalFees}</div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
