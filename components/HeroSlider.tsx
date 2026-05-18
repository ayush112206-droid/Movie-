'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Play, Info, Plus, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTMDB } from '@/hooks/useTMDB';
import { TMDBResponse, Media } from '@/types/tmdb';
import { useWatchlist } from '@/hooks/useWatchlist';

export default function HeroSlider() {
  const { data, isLoading } = useTMDB<TMDBResponse<Media>>('trending/movie/day');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  const trending = data?.results?.slice(0, 6) || [];

  useEffect(() => {
    if (isPaused || trending.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % trending.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [trending.length, isPaused]);

  if (isLoading) return <div className="aspect-[21/9] md:aspect-[21/9] aspect-[4/3] bg-bg-surface-2 animate-pulse rounded-2xl mx-4 my-8" />;
  if (!trending.length) return null;

  const current = trending[currentIndex];

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % trending.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + trending.length) % trending.length);

  return (
    <div 
      className="relative w-full aspect-[4/3] md:aspect-[21/9] overflow-hidden md:rounded-3xl md:mx-auto md:max-w-[96%] mt-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={`https://image.tmdb.org/t/p/original${current.backdrop_path}`}
            alt={(current as any).title || (current as any).name}
            fill
            priority
            className="object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 hero-gradient" />
          
          <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-12 pt-20">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="bg-brand text-xs font-bold px-2 py-1 rounded">#1 Trending</span>
              <span className="bg-white/20 glass text-xs font-bold px-2 py-1 rounded">Movie</span>
              <span className="bg-gold/20 glass text-gold text-xs font-bold px-2 py-1 rounded">4K HDR</span>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-5xl lg:text-6xl font-[900] text-white max-w-2xl mb-4 leading-tight"
            >
            {(current as any).title || (current as any).name}
            </motion.h1>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-4 text-sm text-text-2 mb-6"
            >
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-gold text-gold" />
                <span className="text-white font-bold">{current.vote_average.toFixed(1)}</span>
              </div>
              <span>•</span>
              <span>{((current as any).release_date || (current as any).first_air_date || '').split('-')[0]}</span>
              <span>•</span>
              <span>Action, Drama</span>
            </motion.div>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="hidden md:block text-text-2 text-lg max-w-xl mb-8 line-clamp-3"
            >
              {current.overview}
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-3"
            >
              <button className="bg-brand hover:bg-brand-hover text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 scale-100 hover:scale-105 active:scale-95 transition-transform">
                <Play className="w-5 h-5 fill-current" />
                Stream Now
              </button>
              <button className="hidden md:flex glass hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold items-center gap-2 scale-100 hover:scale-105 transition-transform">
                <Info className="w-5 h-5" />
                More Info
              </button>
              <button 
                onClick={() => toggleWatchlist({
                  id: current.id,
                  type: 'movie',
                  title: (current as any).title || (current as any).name,
                  poster: current.poster_path,
                  rating: current.vote_average,
                  year: ((current as any).release_date || (current as any).first_air_date || '').split('-')[0]
                })}
                className={`glass p-3 rounded-xl transition-all ${isInWatchlist(current.id) ? 'bg-brand/20 text-brand' : 'hover:bg-white/20 text-white'}`}
              >
                <Plus className={`w-6 h-6 transition-transform ${isInWatchlist(current.id) ? 'rotate-45' : ''}`} />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-8 right-8 flex items-center gap-2">
        <button onClick={handlePrev} className="glass p-2 rounded-full hover:bg-white/20 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex gap-1.5 mx-2">
          {trending.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8 bg-brand' : 'w-2 bg-white/40'}`}
            />
          ))}
        </div>
        <button onClick={handleNext} className="glass p-2 rounded-full hover:bg-white/20 transition-colors">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
