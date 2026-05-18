import { TMDBResponse, Media } from '@/types/tmdb';

const TMDB_API_BASE = 'https://api.themoviedb.org/3';
const CACHE_TIME = 120; // 2 minutes

// Simple in-memory rate limiter
const ipRequests = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_PER_MINUTE = 80;

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userData = ipRequests.get(ip);

  if (!userData || now > userData.resetAt) {
    ipRequests.set(ip, { count: 1, resetAt: now + 60000 });
    return true;
  }

  if (userData.count >= RATE_LIMIT_PER_MINUTE) {
    return false;
  }

  userData.count++;
  return true;
}

export async function tmdbFetch<T>(
  endpoint: string,
  params: Record<string, string | number> = {}
): Promise<T> {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) throw new Error('TMDB_API_KEY is not defined');

  // Sanitize params
  const searchParams = new URLSearchParams();
  searchParams.append('api_key', apiKey);
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      // Basic sanitization: remove potential script tags or obvious malicious chars
      const sanitizedValue = String(value).replace(/[<>]/g, '');
      searchParams.append(key, sanitizedValue);
    }
  });

  const url = `${TMDB_API_BASE}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}?${searchParams.toString()}`;

  const res = await fetch(url, {
    next: { revalidate: CACHE_TIME },
  });

  if (!res.ok) {
    throw new Error(`TMDB fetch failed: ${res.statusText}`);
  }

  return res.json();
}

export const TMDB_ENDPOINTS = {
  trendingMovies: '/trending/movie/day',
  trendingTV: '/trending/tv/day',
  popularMovies: '/movie/popular',
  popularTV: '/tv/popular',
  nowPlaying: '/movie/now_playing',
  topRatedMovies: '/movie/top_rated',
  discoverMovie: '/discover/movie',
  discoverTV: '/discover/tv',
  searchMulti: '/search/multi',
};
