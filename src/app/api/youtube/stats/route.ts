import { NextResponse } from 'next/server';
import { getChannelStats } from '@/lib/youtube';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const channelId = searchParams.get('channelId');

  if (!channelId) {
    return NextResponse.json({ error: 'Channel ID is required' }, { status: 400 });
  }

  try {
    const data = await getChannelStats(channelId);
    
    if (!data.items || data.items.length === 0) {
       return NextResponse.json({ error: 'Channel not found' }, { status: 404 });
    }

    return NextResponse.json(data.items[0]);
  } catch (error) {
    console.error('Stats fetch failed', error);
    return NextResponse.json({ error: 'Failed to fetch channel stats' }, { status: 500 });
  }
}
