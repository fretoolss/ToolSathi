import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function CompoundingCalculator() {
  const [initialAmount, setInitialAmount] = useState('1000');
  const [monthlyContribution, setMonthlyContribution] = useState('100');
  const [years, setYears] = useState('10');
  const [interestRate, setInterestRate] = useState('8');

  const data = useMemo(() => {
    const p = parseFloat(initialAmount) || 0;
    const pmt = parseFloat(monthlyContribution) || 0;
    const y = parseInt(years) || 0;
    const r = (parseFloat(interestRate) || 0) / 100;
    
    if (y <= 0) return [];

    let currentBalance = p;
    let totalContributions = p;
    const chartData = [];

    for (let i = 0; i <= y; i++) {
      if (i > 0) {
        // Compound monthly
        for (let m = 0; m < 12; m++) {
          currentBalance = currentBalance * (1 + r / 12) + pmt;
          totalContributions += pmt;
        }
      }
      
      chartData.push({
        year: `Year ${i}`,
        balance: Math.round(currentBalance),
        contributions: Math.round(totalContributions),
        interest: Math.round(currentBalance - totalContributions)
      });
    }

    return chartData;
  }, [initialAmount, monthlyContribution, years, interestRate]);

  const finalData = data[data.length - 1];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Compound Interest Calculator</h1>
        <p className="text-slate-500 dark:text-slate-400">Visualize the power of compounding over time.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 h-fit">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Initial Investment ($)</label>
            <input
              type="number"
              value={initialAmount}
              onChange={(e) => setInitialAmount(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Monthly Contribution ($)</label>
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Years to Grow</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Estimated Annual Interest Rate (%)</label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
            />
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {finalData && (
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Total Balance</h3>
                <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">${finalData.balance.toLocaleString()}</div>
              </div>
              <div className="bg-white dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Total Contributions</h3>
                <div className="text-xl font-bold text-slate-900 dark:text-white">${finalData.contributions.toLocaleString()}</div>
              </div>
              <div className="bg-white dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Total Interest</h3>
                <div className="text-xl font-bold text-emerald-500">${finalData.interest.toLocaleString()}</div>
              </div>
            </div>
          )}

          <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorContributions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="year" tick={{fontSize: 12}} tickMargin={10} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(val) => `$${(val/1000).toFixed(0)}k`} tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                <Tooltip 
                  formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="balance" name="Total Balance" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#colorBalance)" />
                <Area type="monotone" dataKey="contributions" name="Total Contributions" stroke="#94a3b8" strokeWidth={2} fillOpacity={1} fill="url(#colorContributions)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
