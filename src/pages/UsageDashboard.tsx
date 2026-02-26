import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Loader2 } from 'lucide-react';
import { SEO } from '../components/seo';

interface UsageData {
  id: number;
  tool_id: string;
  usage_count: number;
}

export default function UsageDashboard() {
  const [data, setData] = useState<UsageData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsage = async () => {
      try {
        const response = await fetch('/api/usage');
        if (response.ok) {
          const result = await response.json();
          // Sort by usage_count descending
          result.sort((a: UsageData, b: UsageData) => b.usage_count - a.usage_count);
          setData(result);
        }
      } catch (error) {
        console.error('Failed to fetch usage data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsage();
  }, []);

  const formatToolName = (id: string) => {
    return id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const chartData = data.map(item => ({
    name: formatToolName(item.tool_id),
    usage: item.usage_count,
  }));

  return (
    <>
      <SEO 
        title="Tool Usage Dashboard" 
        description="View the usage statistics for all tools on ToolSathi."
      />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl text-indigo-600 dark:text-indigo-400">
            <Activity className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Usage Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400">Monitor the popularity and usage of different tools.</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Tool Usage Statistics</h2>
          
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-600 dark:text-indigo-400" />
            </div>
          ) : data.length === 0 ? (
            <div className="text-center py-20 text-slate-500 dark:text-slate-400">
              No usage data available yet.
            </div>
          ) : (
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 60,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    tickLine={{ stroke: '#cbd5e1' }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    tickLine={{ stroke: '#cbd5e1' }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    allowDecimals={false}
                  />
                  <Tooltip 
                    cursor={{ fill: '#f1f5f9', opacity: 0.1 }}
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: 'none',
                      borderRadius: '8px',
                      color: '#f8fafc'
                    }}
                    itemStyle={{ color: '#818cf8' }}
                  />
                  <Bar 
                    dataKey="usage" 
                    fill="#6366f1" 
                    radius={[4, 4, 0, 0]} 
                    name="Usage Count"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}