import React from 'react';
import { motion } from 'motion/react';

export default function PrivacyPolicy() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Privacy Policy</h1>
        <p className="text-slate-500 dark:text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
      </div>
      <div className="bg-white dark:bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">1. Information We Collect</h2>
          <p>We collect information you provide directly to us when you use our services, such as when you create an account, fill out a form, or communicate with us. We also automatically collect certain information about your device and how you interact with our website.</p>
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">2. How We Use Your Information</h2>
          <p>We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to personalize your experience. We may also use your information to send you promotional materials.</p>
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">3. Information Sharing</h2>
          <p>We do not share your personal information with third parties except as described in this privacy policy or with your consent. We may share information with service providers who perform services on our behalf.</p>
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">4. Data Security</h2>
          <p>We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.</p>
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">5. Your Choices</h2>
          <p>You may update, correct, or delete your account information at any time by logging into your account or contacting us. You may also opt out of receiving promotional communications from us.</p>
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">6. Changes to this Policy</h2>
          <p>We may change this privacy policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy.</p>
        </div>
      </div>
    </motion.div>
  );
}
