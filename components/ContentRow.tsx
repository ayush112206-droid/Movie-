'use client';

import React, { useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Media } from '@/types/tmdb';
import MediaCard from './MediaCard';
import { SkeletonCard } from './SkeletonCard';

interface ContentRowProps {
  title: string;
  items?: Media[];
  isLoading?: boolean;
  href?: string;
}

export default function ContentRow({ title, items, isLoading, href }: ContentRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-6 space-y-4">
      <div className="flex items-center justify-between px-4 md:px-8">
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">{title}</h2>
        {href && (
          <Link href={href} className="text-brand text-xs font-bold uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
            See All <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      <div 
        ref={rowRef}
        className="flex items-center gap-3 px-4 md:px-8 overflow-x-auto hide-scrollbar scroll-momentum snap-x"
      >
        {isLoading ? (
          [...Array(10)].map((_, i) => <SkeletonCard key={i} />)
        ) : (
          items?.map((item) => (
            <MediaCard key={item.id} item={item} className="snap-start" />
          ))
        )}
        <div className="w-8 shrink-0" /> {/* Spacer */}
      </div>
    </div>
  );
}
