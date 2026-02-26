import React, { useState } from 'react';
import { motion } from 'motion/react';

export default function AgeCalculator() {
  const [dob, setDob] = useState('');
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);

  const calculateAge = () => {
    if (!dob || !targetDate) return null;

    const d1 = new Date(dob);
    const d2 = new Date(targetDate);

    if (d1 > d2) return { error: "Date of birth cannot be after target date." };

    let years = d2.getFullYear() - d1.getFullYear();
    let months = d2.getMonth() - d1.getMonth();
    let days = d2.getDate() - d1.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(d2.getFullYear(), d2.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalMonths = years * 12 + months;
    const totalDays = Math.floor((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));

    return { years, months, days, totalMonths, totalDays };
  };

  const result = calculateAge();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Age Calculator</h1>
        <p className="text-slate-500 dark:text-slate-400">Calculate exact age in years, months, and days.</p>
      </div>

      <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Calculate age at</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
            />
          </div>
        </div>

        {result && !result.error && (
          <div className="mt-6 space-y-4">
            <div className="p-6 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl border border-indigo-100 dark:border-indigo-500/20 text-center">
              <h3 className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2">Exact Age</h3>
              <div className="text-3xl font-black text-indigo-700 dark:text-indigo-300">
                {result.years} <span className="text-xl font-medium">years</span> {result.months} <span className="text-xl font-medium">months</span> {result.days} <span className="text-xl font-medium">days</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Total Months</h3>
                <div className="text-xl font-bold text-slate-900 dark:text-white">{result.totalMonths}</div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Total Days</h3>
                <div className="text-xl font-bold text-slate-900 dark:text-white">{result.totalDays}</div>
              </div>
            </div>
          </div>
        )}
        {result?.error && (
          <div className="p-4 text-red-500 text-center">{result.error}</div>
        )}
      </div>
    </motion.div>
  );
}
