'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { History, TrendingUp, Star } from 'lucide-react';
import { Media } from '@/types/tmdb';

interface SearchDropdownProps {
  results?: Media[];
  recents: string[];
  onSelect: (query?: string) => void;
}

export default function SearchDropdown({ results, recents, onSelect }: SearchDropdownProps) {
  return (
    <div className="glass rounded-2xl overflow-hidden border border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
      {results && results.length > 0 ? (
        <div className="p-2 max-h-[400px] overflow-y-auto hide-scrollbar">
          <div className="px-3 py-2 text-xs font-bold text-text-3 uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-3 h-3" /> Results
          </div>
          {results.slice(0, 6).map((item) => (
            <Link
              key={item.id}
              href={`/${(item as any).media_type || 'movie'}/${item.id}`}
              onClick={() => onSelect()}
              className="flex items-center gap-3 p-2 rounded-xl hov:bg-white/5 transition-colors group"
            >
              <div className="relative w-12 aspect-[2/3] rounded-md overflow-hidden bg-bg-surface-2 flex-shrink-0">
                {item.poster_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                    alt={(item as any).title || (item as any).name}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <History className="w-4 h-4 text-text-3" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate group-hover:text-brand transition-colors">
                  {(item as any).title || (item as any).name}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] py-0.5 px-1.5 bg-white/10 rounded-sm text-text-2 uppercase font-bold">
                    {(item as any).media_type || 'movie'}
                  </span>
                  <span className="text-[10px] text-text-3 flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5 fill-gold text-gold" />
                    {item.vote_average.toFixed(1)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : recents.length > 0 ? (
        <div className="p-2">
          <div className="px-3 py-2 text-xs font-bold text-text-3 uppercase tracking-wider flex items-center gap-2">
            <History className="w-3 h-3" /> Recent Searches
          </div>
          {recents.map((q, i) => (
            <button
              key={i}
              onClick={() => onSelect(q)}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 text-sm text-text-2 transition-colors text-left"
            >
              <History className="w-4 h-4 text-text-3" />
              {q}
            </button>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center text-text-3 text-sm">
          Start typing to search...
        </div>
      )}
    </div>
  );
}
