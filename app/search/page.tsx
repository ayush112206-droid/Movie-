'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import { useTMDBInfinite } from '@/hooks/useTMDB';
import MediaGrid from '@/components/MediaGrid';
import { Search } from 'lucide-react';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const { data, size, setSize, isLoading } = useTMDBInfinite('search/multi', { query });

  const results = data ? data.map(page => page.results || []).flat() : [];
  const hasMore = data ? (data[data.length - 1]?.results?.length > 0) : true;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-[900] text-white">Search Results</h1>
        <p className="text-text-3 text-sm mt-1">Found {results.length}+ matches for "{query}"</p>
      </div>

      <MediaGrid 
        items={results} 
        isLoading={isLoading} 
        onLoadMore={() => setSize(size + 1)} 
        hasMore={hasMore && !!query} 
      />
    </div>
  );
}

export default function SearchPage() {
  return (
    <main className="min-h-screen pb-24">
      <Navbar />
      <div className="container mx-auto px-4 md:px-8 pt-28">
        <Suspense fallback={
          <div className="flex items-center justify-center py-24">
            <Search className="w-8 h-8 text-text-3 animate-pulse" />
          </div>
        }>
          <SearchResults />
        </Suspense>
      </div>
      <BottomNav />
    </main>
  );
}
