'use client';

import React from 'react';
import { useTMDB } from '@/hooks/useTMDB';
import { TMDBResponse } from '@/types/tmdb';

export default function StatBar() {
  const { data: movies } = useTMDB<TMDBResponse<any>>('discover/movie');
  const { data: shows } = useTMDB<TMDBResponse<any>>('discover/tv');

  const stats = [
    { label: 'Movies', value: movies?.total_results?.toLocaleString() || '10,000+' },
    { label: 'TV Shows', value: shows?.total_results?.toLocaleString() || '5,000+' },
    { label: 'Quality', value: '4K HDR' },
    { label: 'Access', value: 'Free' },
  ];

  return (
    <div className="w-full px-4 md:px-8 py-8">
      <div className="rounded-2xl border py-6 px-4 md:px-12 flex items-center justify-around md:justify-between flex-wrap gap-8" style={{ background: '#0e0e12', borderColor: 'rgba(255, 255, 255, 0.05)' }}>
        {stats.map((stat, i) => (
          <React.Fragment key={stat.label}>
            <div className="text-center md:text-left">
              <div className="text-xl font-bold text-white">{stat.value}</div>
              <div className="text-[10px] uppercase font-bold tracking-widest opacity-50">{stat.label}</div>
            </div>
            {i < stats.length - 1 && (
              <div className="hidden md:block w-px h-8" style={{ background: 'rgba(255, 255, 255, 0.1)' }} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
