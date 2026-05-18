'use client';

import React from 'react';

export function SkeletonCard() {
  return (
    <div className="relative group bg-bg-surface-2 rounded-xl overflow-hidden aspect-[2/3] w-[110px] md:w-[140px] flex-shrink-0">
      <div className="absolute inset-0 shimmer" />
      <div className="absolute bottom-4 left-3 right-3 space-y-2">
        <div className="h-3 w-3/4 bg-white/5 rounded" />
        <div className="h-2 w-1/4 bg-white/5 rounded" />
      </div>
    </div>
  );
}

export function SkeletonRow({ count = 8 }) {
  return (
    <div className="flex items-center gap-4 px-4 md:px-8 overflow-hidden">
      {[...Array(count)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
