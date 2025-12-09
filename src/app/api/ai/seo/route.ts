import { google } from '@/lib/ai';
import { generateObject } from 'ai';
import { z } from 'zod';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { topic } = await request.json();

    if (!topic) {
        return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    const { object } = await generateObject({
      model: google('gemini-1.5-flash'),
      schema: z.object({
        titles: z.array(z.string()).describe('List of 5 SEO optimized catchy titles'),
        description: z.string().describe('A compelling video description utilizing keywords'),
        tags: z.array(z.string()).describe('List of 15 relevant tags'),
        keywords: z.array(z.string()).describe('List of high volume keywords for the topic'),
      }),
      prompt: `Generate YouTube SEO metadata for a video about: "${topic}". 
      Focus on high, potentially viral click-through rate titles and search-optimized description.`,
    });

    return NextResponse.json(object);
  } catch (error) {
    console.error('AI generation error:', error);
    return NextResponse.json({ error: 'Failed to generate SEO suggestions' }, { status: 500 });
  }
}
