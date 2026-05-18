import { NextRequest, NextResponse } from 'next/server';
import { tmdbFetch, checkRateLimit } from '@/lib/tmdb';

const ALLOWED_ENDPOINTS = [
  'trending/movie/day',
  'trending/tv/day',
  'movie/popular',
  'tv/popular',
  'movie/now_playing',
  'movie/top_rated',
  'discover/movie',
  'discover/tv',
  'search/multi',
  'movie/',
  'tv/',
  'genre/movie/list',
  'genre/tv/list'
];

export async function GET(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || 'anonymous';
  
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const { searchParams } = new URL(req.url);
  const endpoint = searchParams.get('endpoint');
  
  if (!endpoint) {
    return NextResponse.json({ error: 'Endpoint is required' }, { status: 400 });
  }

  // Check if endpoint is allowed
  const isAllowed = ALLOWED_ENDPOINTS.some(ae => endpoint.startsWith(ae));
  if (!isAllowed) {
    return NextResponse.json({ error: 'Endpoint not allowed' }, { status: 403 });
  }

  // Extract other params
  const params: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    if (key !== 'endpoint') {
      params[key] = value;
    }
  });

  try {
    const data = await tmdbFetch(endpoint, params);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
