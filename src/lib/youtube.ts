import { google } from 'googleapis';

const youtube = google.youtube('v3');

export const getChannelStats = async (channelId: string) => {
  try {
    const response = await youtube.channels.list({
      key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
      part: ['snippet', 'statistics', 'contentDetails'],
      id: [channelId],
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching channel stats:', error);
    throw error;
  }
};

export const searchChannels = async (query: string) => {
  try {
    const response = await youtube.search.list({
      key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
      part: ['snippet'],
      q: query,
      type: ['channel'],
      maxResults: 5,
    });

    return response.data;
  } catch (error) {
    console.error('Error searching channels:', error);
    throw error;
  }
};
