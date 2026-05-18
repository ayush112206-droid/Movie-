'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { useContinueWatch } from '@/hooks/useContinueWatch';

export default function ContinueWatching() {
  const { items } = useContinueWatch();

  if (items.length === 0) return null;

  return (
    <div className="py-6 space-y-4">
      <div className="flex items-center justify-between px-4 md:px-8">
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">Continue Watching</h2>
      </div>

      <div className="flex items-center gap-6 px-4 md:px-8 overflow-x-auto hide-scrollbar scroll-momentum">
        {items.map((item) => (
          <Link 
            key={item.id} 
            href={`/${item.type}/${item.id}?server=0${item.type === 'tv' ? `&s=${item.season || 1}&e=${item.episode || 1}` : ''}`}
            className="group shrink-0 w-[240px] md:w-[280px]"
          >
            <div className="relative aspect-video rounded-xl overflow-hidden bg-bg-surface-2">
              <Image
                src={`https://image.tmdb.org/t/p/w500${item.poster}`}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-brand w-12 h-12 rounded-full flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                  <Play className="w-6 h-6 fill-white text-white ml-1" />
                </div>
              </div>
              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20">
                <div 
                  className="h-full bg-brand shadow-[0_0_8px_rgba(229,9,20,1)]" 
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
            <div className="mt-2 space-y-0.5">
              <h3 className="text-sm font-bold text-white truncate">{item.title}</h3>
              {item.type === 'tv' && (
                <p className="text-[10px] uppercase font-bold text-text-3 tracking-wider">
                  S{item.season} E{item.episode}
                </p>
              )}
            </div>
          </Link>
        ))}
        <div className="w-8 shrink-0" />
      </div>
    </div>
  );
}
