'use client';

import { useState, useEffect } from 'react';

export interface ContinueWatchItem {
  id: number;
  type: 'movie' | 'tv';
  title: string;
  poster: string;
  season?: number;
  episode?: number;
  progress: number;
  ts: number;
}

export function useContinueWatch() {
  const [items, setItems] = useState<ContinueWatchItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('v8_continue');
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse continue watching', e);
      }
    }
  }, []);

  const addToContinueWatch = (item: Omit<ContinueWatchItem, 'ts'>) => {
    const newItem: ContinueWatchItem = { ...item, ts: Date.now() };
    const filtered = items.filter((i) => i.id !== item.id);
    const newList = [newItem, ...filtered].slice(0, 12);

    setItems(newList);
    localStorage.setItem('v8_continue', JSON.stringify(newList));
  };

  return { items, addToContinueWatch };
}
