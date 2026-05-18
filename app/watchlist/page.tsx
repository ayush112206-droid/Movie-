'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import { useWatchlist } from '@/hooks/useWatchlist';
import MediaCard from '@/components/MediaCard';
import { Heart } from 'lucide-react';
import { Media } from '@/types/tmdb';

export default function WatchlistPage() {
  const { watchlist } = useWatchlist();

  return (
    <main className="min-h-screen pb-24">
      <Navbar />
      
      <div className="container mx-auto px-4 md:px-8 pt-28 space-y-8">
        <div>
          <h1 className="text-3xl font-[900] text-white">My List</h1>
          <p className="text-text-3 text-sm mt-1">Your personal collection of movies and shows.</p>
        </div>

        {watchlist.length === 0 ? (
          <div className="py-24 text-center space-y-6">
            <div className="flex justify-center">
               <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center">
                 <Heart className="w-12 h-12 text-text-3" />
               </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Your list is empty</h3>
              <p className="text-text-3 max-w-xs mx-auto">Add movies and shows to your list to keep track of what you want to watch next.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {watchlist.map((item) => (
              <MediaCard 
                key={item.id} 
                item={{
                  id: item.id,
                  poster_path: item.poster,
                  vote_average: item.rating,
                  title: item.type === 'movie' ? item.title : '',
                  name: item.type === 'tv' ? item.title : '',
                  release_date: item.type === 'movie' ? item.year : '',
                  first_air_date: item.type === 'tv' ? item.year : '',
                } as any} 
                className="w-full"
              />
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </main>
  );
}
