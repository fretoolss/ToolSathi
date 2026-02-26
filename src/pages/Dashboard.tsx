import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { 
  Youtube, 
  TrendingUp, 
  Search, 
  Wrench,
  ArrowRight,
  Type,
  Tags,
  Image as ImageIcon,
  Calculator,
  PieChart,
  Bitcoin,
  LineChart,
  FileText,
  AlignLeft,
  Percent,
  Calendar,
  CreditCard,
  Minimize,
  FileImage
} from 'lucide-react';

export const toolsList = [
  {
    category: 'YouTube Tools',
    icon: Youtube,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    path: '/youtube',
    tools: [
      { name: 'Viral Title Generator', path: '/youtube/viral-title', icon: Type, desc: 'AI-powered click-worthy titles' },
      { name: 'Tag Generator', path: '/youtube/tags', icon: Tags, desc: 'High-volume SEO tags for videos' },
      { name: 'Thumbnail Analyzer', path: '/youtube/thumbnail-analyzer', icon: ImageIcon, desc: 'Predict CTR for your headlines' },
    ]
  },
  {
    category: 'Trading Tools',
    icon: TrendingUp,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    path: '/trading',
    tools: [
      { name: 'Risk Reward Calculator', path: '/trading/risk-reward', icon: Calculator, desc: 'Calculate R:R ratio instantly' },
      { name: 'Position Size', path: '/trading/position-size', icon: PieChart, desc: 'Determine exact lot sizes' },
      { name: 'Crypto Profit', path: '/trading/crypto-profit', icon: Bitcoin, desc: 'Calculate potential crypto gains' },
      { name: 'Compounding', path: '/trading/compounding', icon: LineChart, desc: 'Visualize portfolio growth' },
    ]
  },
  {
    category: 'SEO Tools',
    icon: Search,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    path: '/seo',
    tools: [
      { name: 'Keyword Density', path: '/seo/keyword-density', icon: FileText, desc: 'Analyze text keyword frequency' },
      { name: 'Meta Description', path: '/seo/meta-description', icon: AlignLeft, desc: 'AI-generated SEO descriptions' },
      { name: 'Word Counter', path: '/seo/word-counter', icon: Type, desc: 'Count words, chars, and reading time' },
    ]
  },
  {
    category: 'Utility Tools',
    icon: Wrench,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    path: '/utility',
    tools: [
      { name: 'Percentage Calc', path: '/utility/percentage', icon: Percent, desc: 'Quick percentage calculations' },
      { name: 'Age Calculator', path: '/utility/age', icon: Calendar, desc: 'Calculate exact age in days/months' },
      { name: 'EMI Calculator', path: '/utility/emi', icon: CreditCard, desc: 'Loan EMI and interest calculator' },
      { name: 'Image Compressor', path: '/utility/image-compressor', icon: Minimize, desc: 'Compress images without quality loss' },
      { name: 'PDF to JPG', path: '/utility/pdf-to-jpg', icon: FileImage, desc: 'Convert PDF pages to images' },
    ]
  }
];

export default function Dashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Welcome to ToolSathi</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Smart tools for smart creators. Select a category to get started.</p>
        </div>
        
        {/* AdSense Placeholder */}
        <div className="hidden md:flex w-[320px] h-[50px] bg-slate-200 dark:bg-slate-800 rounded-lg items-center justify-center text-xs text-slate-400 border border-dashed border-slate-300 dark:border-slate-700">
          AdSense Placeholder (Header)
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {toolsList.map((category, idx) => {
          const Icon = category.icon;
          return (
            <motion.div 
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-950 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={cn("p-3 rounded-xl", category.bgColor)}>
                  <Icon className={cn("h-6 w-6", category.color)} />
                </div>
                <Link to={category.path} className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                  View All <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">{category.category}</h2>
              <div className="space-y-3">
                {category.tools.slice(0, 3).map(tool => {
                  const ToolIcon = tool.icon;
                  return (
                    <Link 
                      key={tool.name} 
                      to={tool.path}
                      className="group flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                    >
                      <div className="mt-0.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-md group-hover:bg-white dark:group-hover:bg-slate-700 transition-colors">
                        <ToolIcon className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-slate-900 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{tool.name}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-500 line-clamp-1">{tool.desc}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* AdSense Placeholder */}
      <div className="w-full h-[90px] bg-slate-200 dark:bg-slate-800 rounded-xl flex items-center justify-center text-sm text-slate-400 border border-dashed border-slate-300 dark:border-slate-700">
        AdSense Placeholder (Horizontal Banner)
      </div>

    </motion.div>
  );
}
