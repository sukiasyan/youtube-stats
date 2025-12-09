'use client';

import { useState } from 'react';
import ChannelSearch from '@/components/ChannelSearch';
import ChannelStats from '@/components/ChannelStats';
import SeoGenerator from '@/components/SeoGenerator';
import { Youtube } from 'lucide-react';

export default function Home() {
  const [selectedChannelStats, setSelectedChannelStats] = useState<{
    snippet: {
        title: string;
        description: string;
        thumbnails: { medium: { url: string } };
    };
    statistics: {
        subscriberCount: string;
        viewCount: string;
        videoCount: string;
    };
  } | null>(null);

  const handleChannelSelect = async (channelId: string) => {
    try {
      const res = await fetch(`/api/youtube/stats?channelId=${channelId}`);
      const data = await res.json();
      if (!data.error) {
        setSelectedChannelStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch stats', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white selection:bg-red-500/30">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <header className="mb-16 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-red-600/10 rounded-2xl mb-6">
            <Youtube className="text-red-600 w-12 h-12" />
          </div>
          <h1 className="text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            Creator Dashboard
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Deep dive into channel analytics and supercharge your content with AI.
          </p>
        </header>

        <ChannelSearch onSelectChannel={handleChannelSelect} />
        
        {selectedChannelStats && (
          <ChannelStats stats={selectedChannelStats} />
        )}

        <div className="mt-16">
          <SeoGenerator />
        </div>
      </div>
    </div>
  );
}
