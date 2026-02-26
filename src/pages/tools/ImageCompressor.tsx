import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import imageCompression from 'browser-image-compression';
import { Upload, Download, Image as ImageIcon, Loader2 } from 'lucide-react';

export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [quality, setQuality] = useState('0.8');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setCompressedFile(null);
    }
  };

  const compressImage = async () => {
    if (!file) return;
    
    setLoading(true);
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        initialQuality: parseFloat(quality)
      };
      
      const compressed = await imageCompression(file, options);
      setCompressedFile(compressed);
    } catch (error) {
      console.error(error);
      alert('Failed to compress image.');
    } finally {
      setLoading(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const downloadImage = () => {
    if (!compressedFile) return;
    const url = URL.createObjectURL(compressedFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compressed_${file?.name || 'image.jpg'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Image Compressor</h1>
        <p className="text-slate-500 dark:text-slate-400">Compress images without losing visible quality. Processing happens in your browser.</p>
      </div>

      <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-12 text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
        >
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <Upload className="h-10 w-10 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-700 dark:text-slate-300 font-medium">Click to upload or drag and drop</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">JPG, PNG, WebP (Max 10MB)</p>
        </div>

        {file && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <ImageIcon className="h-8 w-8 text-indigo-500" />
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-200 truncate max-w-[200px] sm:max-w-xs">{file.name}</p>
                  <p className="text-xs text-slate-500">{formatSize(file.size)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <label className="text-xs text-slate-500 mb-1">Quality</label>
                  <select 
                    value={quality} 
                    onChange={e => setQuality(e.target.value)}
                    className="text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md px-2 py-1 outline-none"
                  >
                    <option value="0.9">High (90%)</option>
                    <option value="0.8">Medium (80%)</option>
                    <option value="0.6">Low (60%)</option>
                  </select>
                </div>
                <button
                  onClick={compressImage}
                  disabled={loading}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Compress'}
                </button>
              </div>
            </div>

            {compressedFile && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-800 dark:text-emerald-400">Compression Complete!</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-500 mt-1">
                    New size: {formatSize(compressedFile.size)} 
                    <span className="font-bold ml-1">
                      (-{((file.size - compressedFile.size) / file.size * 100).toFixed(0)}%)
                    </span>
                  </p>
                </div>
                <button
                  onClick={downloadImage}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <Download className="h-4 w-4" /> Download
                </button>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
