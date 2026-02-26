import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Coins } from 'lucide-react';
import { SEO } from '../../components/seo';

export default function DcaCalculator() {
  const [investment, setInvestment] = useState('100');
  const [frequency, setFrequency] = useState('monthly');
  const [years, setYears] = useState('5');
  const [expectedReturn, setExpectedReturn] = useState('10');

  const calculateDCA = () => {
    const pmt = parseFloat(investment);
    const y = parseFloat(years);
    const r = parseFloat(expectedReturn) / 100;

    if (!pmt || !y || isNaN(r)) return null;

    let nPerYear = 12;
    if (frequency === 'weekly') nPerYear = 52;
    if (frequency === 'daily') nPerYear = 365;

    const totalPeriods = y * nPerYear;
    const ratePerPeriod = r / nPerYear;

    const totalInvested = pmt * totalPeriods;
    
    // Future Value of a Series formula (investing at the beginning of each period)
    let futureValue = 0;
    if (ratePerPeriod === 0) {
      futureValue = totalInvested;
    } else {
      futureValue = pmt * ((Math.pow(1 + ratePerPeriod, totalPeriods) - 1) / ratePerPeriod) * (1 + ratePerPeriod);
    }

    const profit = futureValue - totalInvested;
    const roi = (profit / totalInvested) * 100;

    return {
      totalInvested: totalInvested.toFixed(2),
      futureValue: futureValue.toFixed(2),
      profit: profit.toFixed(2),
      roi: roi.toFixed(2)
    };
  };

  const result = calculateDCA();

  return (
    <>
      <SEO 
        title="DCA Calculator (Dollar Cost Averaging)" 
        description="Calculate the future value of your portfolio using Dollar Cost Averaging (DCA) for crypto, stocks, and index funds."
        keywords="dca calculator, dollar cost averaging, crypto investment calculator, stock investment calculator"
        canonicalUrl="https://toolsathi.com/trading/dca"
      />
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">DCA Calculator</h1>
        <p className="text-slate-500 dark:text-slate-400">Calculate returns for Dollar Cost Averaging into Crypto or Stocks.</p>
      </div>

      <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Investment Amount ($)</label>
            <input
              type="number"
              value={investment}
              onChange={(e) => setInvestment(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Frequency</label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Duration (Years)</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Expected Annual Return (%)</label>
            <input
              type="number"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
            />
          </div>
        </div>

        {result && (
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl border border-indigo-100 dark:border-indigo-500/20 text-center sm:col-span-2">
              <h3 className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2">Total Portfolio Value</h3>
              <div className="text-4xl font-black text-indigo-700 dark:text-indigo-300">${parseFloat(result.futureValue).toLocaleString()}</div>
              <div className="mt-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                +{result.roi}% Return
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Total Amount Invested</h3>
              <div className="text-xl font-bold text-slate-900 dark:text-white">${parseFloat(result.totalInvested).toLocaleString()}</div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Total Profit</h3>
              <div className="text-xl font-bold text-emerald-500">${parseFloat(result.profit).toLocaleString()}</div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
    </>
  );
}
