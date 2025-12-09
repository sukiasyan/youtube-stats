import { NextResponse } from 'next/server';
import { searchChannels } from '@/lib/youtube';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 });
  }

  try {
    const data = await searchChannels(query);
    return NextResponse.json(data.items || []);
  } catch (error) {
    console.error('Stats fetch failed', error);
    return NextResponse.json({ error: 'Failed to fetch channel stats' }, { status: 500 });
  }
}
