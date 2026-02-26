import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Code, Plus, Trash2, Copy, CheckCircle2 } from 'lucide-react';

export default function FaqSchemaGenerator() {
  const [faqs, setFaqs] = useState([{ question: '', answer: '' }]);
  const [copied, setCopied] = useState(false);

  const addFaq = () => {
    setFaqs([...faqs, { question: '', answer: '' }]);
  };

  const removeFaq = (index: number) => {
    const newFaqs = faqs.filter((_, i) => i !== index);
    setFaqs(newFaqs.length ? newFaqs : [{ question: '', answer: '' }]);
  };

  const updateFaq = (index: number, field: 'question' | 'answer', value: string) => {
    const newFaqs = [...faqs];
    newFaqs[index][field] = value;
    setFaqs(newFaqs);
  };

  const generateSchema = () => {
    const validFaqs = faqs.filter(f => f.question.trim() && f.answer.trim());
    
    if (validFaqs.length === 0) return '';

    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": validFaqs.map(f => ({
        "@type": "Question",
        "name": f.question.trim(),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer.trim()
        }
      }))
    };

    return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
  };

  const schemaCode = generateSchema();

  const copyToClipboard = () => {
    if (!schemaCode) return;
    navigator.clipboard.writeText(schemaCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">FAQ Schema Generator</h1>
        <p className="text-slate-500 dark:text-slate-400">Generate JSON-LD FAQ schema markup for rich snippets in Google Search.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 relative group">
              <button 
                onClick={() => removeFaq(index)}
                className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
                title="Remove FAQ"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Question {index + 1}</label>
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => updateFaq(index, 'question', e.target.value)}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
                  placeholder="e.g., What is your return policy?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Answer</label>
                <textarea
                  value={faq.answer}
                  onChange={(e) => updateFaq(index, 'answer', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white resize-none"
                  placeholder="e.g., You can return any item within 30 days of purchase."
                />
              </div>
            </div>
          ))}

          <button
            onClick={addFaq}
            className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 py-3 px-4 rounded-xl font-medium transition-colors border border-dashed border-slate-300 dark:border-slate-700"
          >
            <Plus className="h-5 w-5" /> Add Another Question
          </button>
        </div>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm overflow-hidden flex flex-col h-full min-h-[400px]">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950">
            <div className="flex items-center gap-2 text-slate-400">
              <Code className="h-4 w-4" />
              <span className="text-sm font-medium">JSON-LD Code</span>
            </div>
            <button
              onClick={copyToClipboard}
              disabled={!schemaCode}
              className="flex items-center gap-1.5 text-sm font-medium text-indigo-400 hover:text-indigo-300 disabled:text-slate-600 transition-colors"
            >
              {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied' : 'Copy Code'}
            </button>
          </div>
          <div className="p-4 overflow-auto flex-1">
            {schemaCode ? (
              <pre className="text-sm text-emerald-400 font-mono whitespace-pre-wrap break-all">
                {schemaCode}
              </pre>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-600 text-sm">
                Fill out at least one question and answer to generate schema.
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
