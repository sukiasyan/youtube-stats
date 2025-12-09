'use client';

import { useState } from 'react';
import { Sparkles, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SeoGenerator() {
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState<{
    titles: string[];
    description: string;
    tags: string[];
    keywords: string[];
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/ai/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error('Generation failed', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="text-purple-400" size={28} />
        <h2 className="text-2xl font-bold text-white">AI SEO Genius</h2>
      </div>

      <div className="flex gap-4 mb-8">
        <div className="flex-1">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="What is your video about? (e.g. 'How to make sourdough bread')"
            className="w-full p-4 rounded-lg border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          />
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading || !topic.trim()}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
        >
          {loading ? (
            <span className="animate-pulse">Generating...</span>
          ) : (
            <>
              <Sparkles size={20} />
              Generate
            </>
          )}
        </button>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Titles */}
            <div>
              <h3 className="text-sm font-medium uppercase tracking-wider text-purple-400 mb-4">Optimized Titles</h3>
              <div className="space-y-3">
                {result.titles.map((title: string, i: number) => (
                  <div key={i} className="group flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-800 hover:border-purple-500/50 transition-colors">
                    <p className="text-white font-medium">{title}</p>
                    <button
                      onClick={() => copyToClipboard(title, `title-${i}`)}
                      className="text-gray-500 hover:text-white transition-colors"
                      title="Copy title"
                    >
                      {copied === `title-${i}` ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium uppercase tracking-wider text-blue-400">Description Draft</h3>
                <button
                  onClick={() => copyToClipboard(result.description, 'desc')}
                  className="text-gray-500 hover:text-white transition-colors flex items-center gap-2 text-sm"
                >
                  {copied === 'desc' ? <span className="text-green-500 flex items-center gap-1"><Check size={14}/> Copied</span> : <><Copy size={14}/> Copy All</>}
                </button>
              </div>
              <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800 text-gray-300 leading-relaxed whitespace-pre-wrap">
                {result.description}
              </div>
            </div>

            {/* Tags & Keywords */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-medium uppercase tracking-wider text-green-400 mb-4">Recommended Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {result.tags.map((tag: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-gray-900 border border-gray-700 text-gray-300 text-sm rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium uppercase tracking-wider text-yellow-400 mb-4">Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {result.keywords.map((kw: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-gray-900 border border-gray-700 text-gray-300 text-sm rounded-md">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
