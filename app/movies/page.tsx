'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import { useTMDBInfinite } from '@/hooks/useTMDB';
import MediaGrid from '@/components/MediaGrid';
import { MOODS, LANGUAGES } from '@/lib/constants';
import { Filter, Grid, List as ListIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function MoviesPage() {
  const [activeMood, setActiveMood] = useState('all');
  const [activeLang, setActiveLang] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [minRating, setMinRating] = useState(0);

  const params: any = {};
  if (activeMood !== 'all') params.with_genres = activeMood;
  if (activeLang !== 'all') params.with_original_language = activeLang;
  if (minRating > 0) params['vote_average.gte'] = minRating;

  const { data, size, setSize, isLoading } = useTMDBInfinite('discover/movie', params);

  const movies = data ? data.map(page => page.results || []).flat() : [];
  const hasMore = data ? (data[data.length - 1]?.results?.length > 0) : true;

  return (
    <main className="min-h-screen pb-24">
      <Navbar />
      
      <div className="container mx-auto px-4 md:px-8 pt-28 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-[900] text-white">Movies</h1>
            <p className="text-text-3 text-sm mt-1">Discover the best of Hollywood, Bollywood and beyond.</p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar scroll-momentum pb-2">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setActiveLang(lang.code)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeLang === lang.code ? 'bg-brand text-white shadow-[0_0_12px_rgba(229,9,20,0.4)]' : 'bg-white/5 text-text-2 hover:bg-white/10'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        {/* Mood Bar */}
        <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar scroll-momentum py-2">
          {MOODS.map((mood) => (
            <button
              key={mood.id}
              onClick={() => setActiveMood(mood.id)}
              className={`shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl border transition-all ${
                activeMood === mood.id 
                  ? 'bg-brand/10 border-brand text-brand shadow-[0_0_20px_rgba(229,9,20,0.1)]' 
                  : 'bg-bg-surface border-white/5 text-text-2 hover:border-white/20'
              }`}
            >
              <span className="text-lg">{mood.icon}</span>
              <span className="text-sm font-bold">{mood.name}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between">
           <div className="flex items-center gap-4">
             <button 
               onClick={() => setShowFilters(!showFilters)}
               className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${showFilters ? 'bg-brand text-white' : 'bg-white/5 text-text-2'}`}
             >
               <Filter className="w-4 h-4" />
               Filters
             </button>
           </div>
           <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg">
             <button className="p-2 text-brand bg-white/10 rounded-md"><Grid className="w-4 h-4" /></button>
             <button className="p-2 text-text-3 hover:text-white"><ListIcon className="w-4 h-4" /></button>
           </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-bg-surface-2 rounded-2xl p-6 border border-white/5 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">Minimum Rating</span>
                    <span className="text-sm font-bold text-brand">{minRating === 0 ? 'All' : `${minRating}+`}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="9" 
                    step="1" 
                    value={minRating}
                    onChange={(e) => setMinRating(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand"
                  />
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={() => { setMinRating(0); setActiveMood('all'); setActiveLang('all'); }}
                    className="flex-1 py-3 rounded-xl bg-white/5 text-white font-bold text-sm hover:bg-white/10 transition-all"
                  >
                    Reset All
                  </button>
                  <button 
                    onClick={() => setShowFilters(false)}
                    className="flex-1 py-3 rounded-xl bg-brand text-white font-bold text-sm hover:bg-brand-hover transition-all"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <MediaGrid 
          items={movies} 
          isLoading={isLoading} 
          onLoadMore={() => setSize(size + 1)} 
          hasMore={hasMore} 
        />
      </div>

      <BottomNav />
    </main>
  );
}
