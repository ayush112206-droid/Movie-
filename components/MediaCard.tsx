'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Play, Plus, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { Media } from '@/types/tmdb';
import { useWatchlist } from '@/hooks/useWatchlist';

interface MediaCardProps {
  item: Media;
  className?: string;
}

export default function MediaCard({ item, className }: MediaCardProps) {
  const isMovie = !!(item as any).title;
  const title = isMovie ? (item as any).title : (item as any).name;
  const date = isMovie ? (item as any).release_date : (item as any).first_air_date;
  const year = date?.split('-')[0] || '';
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.025, zIndex: 10 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`relative group bg-[#1e1e26] rounded-xl overflow-hidden aspect-[2/3] w-[148px] md:w-[175px] flex-shrink-0 cursor-pointer shadow-lg hover:shadow-2xl transition-shadow border border-white/5 ${className}`}
    >
      <Link href={`/${isMovie ? 'movie' : 'tv'}/${item.id}`}>
        <div className="relative w-full h-full overflow-hidden">
          {item.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
              alt={title}
              fill
              className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-104 transition-all duration-500"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-bg-surface-2 text-text-3 font-bold text-center p-4">
              {title}
            </div>
          )}
          
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 card-overlay-gradient" />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            <div className="bg-gold/90 text-[10px] font-bold text-bg-base px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow-sm">
              <Star className="w-2.5 h-2.5 fill-current" />
              {item.vote_average.toFixed(1)}
            </div>
          </div>
          <div className="absolute top-2 right-2">
            <div className={`text-[10px] font-bold text-white px-1.5 py-0.5 rounded shadow-sm ${isMovie ? 'bg-brand/90' : 'bg-accent/90'}`}>
              {isMovie ? 'MOVIE' : 'TV'}
            </div>
          </div>

          {/* Hover Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
            <div className="flex items-center gap-2 mb-3">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-brand w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
              >
                <Play className="w-5 h-5 fill-white text-white ml-0.5" />
              </motion.div>
              <button 
                onClick={(e) => {
                   e.preventDefault();
                   toggleWatchlist({
                     id: item.id,
                     type: isMovie ? 'movie' : 'tv',
                     title,
                     poster: item.poster_path,
                     rating: item.vote_average,
                     year
                   });
                }}
                className={`w-10 h-10 rounded-full glass flex items-center justify-center transition-colors ${isInWatchlist(item.id) ? 'bg-brand/20 text-brand' : 'text-white hover:bg-white/20'}`}
              >
                <Plus className={`w-5 h-5 transition-transform ${isInWatchlist(item.id) ? 'rotate-45' : ''}`} />
              </button>
            </div>
            <h3 className="text-sm font-bold text-white line-clamp-2 leading-tight mb-0.5">{title}</h3>
            <p className="text-[10px] text-text-2 font-medium">{year}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
