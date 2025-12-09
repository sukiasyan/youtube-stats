'use client';

import { Users, Play, Video } from 'lucide-react';

interface ChannelStatsProps {
  stats: {
    snippet: {
        title: string;
        description: string;
        thumbnails: {
            medium: { url: string };
        };
    };
    statistics: {
        subscriberCount: string;
        viewCount: string;
        videoCount: string;
    };
  } | null;
}

export default function ChannelStats({ stats }: ChannelStatsProps) {
  if (!stats) return null;

  const { snippet, statistics } = stats;

  const formatNumber = (num: string) => {
    return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(Number(num));
  };

  return (
    <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 shadow-2xl mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-6 mb-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={snippet.thumbnails.medium.url}
          alt={snippet.title}
          className="w-24 h-24 rounded-full border-4 border-gray-700 shadow-lg"
        />
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">{snippet.title}</h2>
          <p className="text-gray-400 max-w-2xl">{snippet.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-2 text-red-400">
            <Users size={24} />
            <span className="text-sm font-medium uppercase tracking-wider">Subscribers</span>
          </div>
          <p className="text-4xl font-bold text-white">{formatNumber(statistics.subscriberCount)}</p>
        </div>
        
        <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-2 text-blue-400">
            <Play size={24} />
            <span className="text-sm font-medium uppercase tracking-wider">Total Views</span>
          </div>
          <p className="text-4xl font-bold text-white">{formatNumber(statistics.viewCount)}</p>
        </div>

        <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-2 text-green-400">
            <Video size={24} />
            <span className="text-sm font-medium uppercase tracking-wider">Videos</span>
          </div>
          <p className="text-4xl font-bold text-white">{formatNumber(statistics.videoCount)}</p>
        </div>
      </div>
    </div>
  );
}
