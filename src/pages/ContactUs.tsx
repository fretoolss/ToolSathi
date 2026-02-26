import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MessageSquare, Send } from 'lucide-react';

export default function ContactUs() {
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Message sent successfully! We will get back to you soon.');
    setTimeout(() => setStatus(''), 5000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Contact Us</h1>
        <p className="text-slate-500 dark:text-slate-400">Have a question or feedback? We'd love to hear from you.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <Mail className="h-6 w-6 text-indigo-500 mb-4" />
            <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Email Us</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">support@toolsathi.com</p>
          </div>
          <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <MessageSquare className="h-6 w-6 text-indigo-500 mb-4" />
            <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Live Chat</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Available Mon-Fri, 9am-5pm EST</p>
          </div>
        </div>

        <div className="md:col-span-2 bg-white dark:bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">First Name</label>
                <input required type="text" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Last Name</label>
                <input required type="text" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
              <input required type="email" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
              <textarea required rows={4} className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white resize-none"></textarea>
            </div>
            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-xl font-medium transition-colors">
              <Send className="h-4 w-4" /> Send Message
            </button>
            {status && <p className="text-emerald-600 dark:text-emerald-400 text-sm text-center mt-4">{status}</p>}
          </form>
        </div>
      </div>
    </motion.div>
  );
}
