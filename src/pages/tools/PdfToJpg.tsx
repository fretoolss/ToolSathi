import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import * as pdfjsLib from 'pdfjs-dist';
import { Upload, Download, FileText, Loader2 } from 'lucide-react';

// Set worker path
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function PdfToJpg() {
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setImages([]);
    }
  };

  const convertPdf = async () => {
    if (!file) return;
    
    setLoading(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      const numPages = pdf.numPages;
      const imageUrls: string[] = [];

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 }); // Higher scale for better quality
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        if (!context) continue;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
          canvasContext: context,
          viewport: viewport
        } as any).promise;

        imageUrls.push(canvas.toDataURL('image/jpeg', 0.9));
      }

      setImages(imageUrls);
    } catch (error) {
      console.error(error);
      alert('Failed to convert PDF. Ensure it is a valid PDF file.');
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = (url: string, index: number) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `page_${index + 1}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">PDF to JPG Converter</h1>
        <p className="text-slate-500 dark:text-slate-400">Convert PDF pages into high-quality JPG images securely in your browser.</p>
      </div>

      <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-12 text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
        >
          <input 
            type="file" 
            accept="application/pdf" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <Upload className="h-10 w-10 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-700 dark:text-slate-300 font-medium">Click to upload PDF</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Max 50 pages recommended</p>
        </div>

        {file && (
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-200 truncate max-w-[200px] sm:max-w-xs">{file.name}</p>
                <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            
            <button
              onClick={convertPdf}
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Convert to JPG'}
            </button>
          </div>
        )}
      </div>

      {images.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((url, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
              <div className="w-full aspect-[1/1.4] bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden mb-4 border border-slate-200 dark:border-slate-800">
                <img src={url} alt={`Page ${idx + 1}`} className="w-full h-full object-contain" />
              </div>
              <div className="w-full flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Page {idx + 1}</span>
                <button
                  onClick={() => downloadImage(url, idx)}
                  className="p-2 text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"
                >
                  <Download className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
