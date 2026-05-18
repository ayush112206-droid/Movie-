'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/components/Toast';

export interface WatchlistItem {
  id: number;
  type: 'movie' | 'tv';
  title: string;
  poster: string;
  rating: number;
  year: string;
}

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem('v8_watchlist');
    if (stored) {
      try {
        setWatchlist(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse watchlist', e);
      }
    }
  }, []);

  const toggleWatchlist = (item: WatchlistItem) => {
    const isExist = watchlist.find((i) => i.id === item.id);
    let newList: WatchlistItem[];

    if (isExist) {
      newList = watchlist.filter((i) => i.id !== item.id);
      showToast('Removed from My List', 'info');
    } else {
      newList = [item, ...watchlist];
      showToast('Added to My List', 'success');
    }

    setWatchlist(newList);
    localStorage.setItem('v8_watchlist', JSON.stringify(newList));
    return !isExist;
  };

  const isInWatchlist = (id: number) => {
    return !!watchlist.find((i) => i.id === id);
  };

  return { watchlist, toggleWatchlist, isInWatchlist };
}
