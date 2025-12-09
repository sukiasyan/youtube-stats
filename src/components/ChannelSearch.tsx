'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

interface ChannelSearchProps {
  onSelectChannel: (channelId: string) => void;
}

export default function ChannelSearch({ onSelectChannel }: ChannelSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{
    id: { channelId: string };
    snippet: {
        channelTitle: string;
        description: string;
        thumbnails: { default: { url: string } };
    };
  }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/youtube/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error('Search failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <form onSubmit={handleSearch} className="relative mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search YouTube Channels..."
          className="w-full p-4 pl-12 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors text-sm font-medium"
          disabled={loading}
        >
          {loading ? '...' : 'Search'}
        </button>
      </form>

      {results.length > 0 && (
        <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 shadow-xl">
          {results.map((channel) => (
            <div
              key={channel.id.channelId}
              onClick={() => {
                onSelectChannel(channel.id.channelId);
                setResults([]);
                setQuery('');
              }}
              className="p-4 hover:bg-gray-700 cursor-pointer flex items-center gap-4 transition-colors border-b border-gray-700 last:border-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={channel.snippet.thumbnails.default.url}
                alt={channel.snippet.channelTitle}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-white">{channel.snippet.channelTitle}</h3>
                <p className="text-gray-400 text-sm truncate">{channel.snippet.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
