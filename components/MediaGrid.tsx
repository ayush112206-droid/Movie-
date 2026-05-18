'use client';

import React, { useEffect, useRef } from 'react';
import MediaCard from './MediaCard';
import { Media } from '@/types/tmdb';
import { SkeletonCard } from './SkeletonCard';
import { Loader2 } from 'lucide-react';

interface MediaGridProps {
  items: Media[];
  isLoading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export default function MediaGrid({ items, isLoading, onLoadMore, hasMore }: MediaGridProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!onLoadMore || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          onLoadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [isLoading, hasMore, onLoadMore]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {items.map((item, i) => (
          <MediaCard key={`${item.id}-${i}`} item={item} className="w-full md:w-full" />
        ))}
        {isLoading && [...Array(10)].map((_, i) => <SkeletonCard key={i} />)}
      </div>

      {hasMore && (
        <div ref={sentinelRef} className="h-20 flex items-center justify-center">
          {isLoading && <Loader2 className="w-6 h-6 text-brand animate-spin" />}
        </div>
      )}

      {!hasMore && items.length > 0 && (
        <div className="py-12 text-center text-text-3 text-sm font-medium">
          No more results found.
        </div>
      )}

      {items.length === 0 && !isLoading && (
         <div className="py-24 text-center space-y-4">
           <div className="text-6xl">👻</div>
           <h3 className="text-xl font-bold text-white">No items found</h3>
           <p className="text-text-3">Try adjusting your filters or search query.</p>
         </div>
      )}
    </div>
  );
}
