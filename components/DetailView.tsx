'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, Clock, Calendar, Check, MessageCircle, Share2, Copy, Play, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Media, Cast } from '@/types/tmdb';
import VideoPlayer from '@/components/VideoPlayer';
import { VIDEO_SERVERS } from '@/lib/constants';
import ContentRow from '@/components/ContentRow';
import { useWatchlist } from '@/hooks/useWatchlist';
import { useContinueWatch } from '@/hooks/useContinueWatch';

interface DetailViewProps {
  id: string;
  type: 'movie' | 'tv';
  data: Media | undefined;
  similar?: Media[];
  isLoading?: boolean;
}

export default function DetailView({ id, type, data, similar, isLoading }: DetailViewProps) {
  const [activeServer, setActiveServer] = useState(2);
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'cast' | 'similar'>('overview');
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const { addToContinueWatch } = useContinueWatch();

  useEffect(() => {
    if (data) {
      addToContinueWatch({
        id: data.id,
        type,
        title: (data as any).title || (data as any).name,
        poster: data.poster_path,
        season,
        episode,
        progress: 10, // Initial progress
      });
    }
  }, [data, season, episode]);

  const title = (data as any)?.title || (data as any)?.name || 'Loading...';
  const year = ((data as any)?.release_date || (data as any)?.first_air_date || '').split('-')[0];
  const runtime = (data as any)?.runtime || (data as any)?.episode_run_time?.[0];

  return (
    <div className="min-h-screen bg-bg-base pb-24">
      {/* Player Section */}
      <div className="sticky top-0 z-40 bg-bg-base shadow-2xl">
        <VideoPlayer 
          id={id} 
          type={type} 
          season={season} 
          episode={episode} 
          currentServer={activeServer}
        />
        
        <div className="glass px-4 md:px-8 py-3 flex flex-wrap items-center justify-between gap-4 text-white">
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
            {VIDEO_SERVERS.map((server) => (
              <button
                key={server.id}
                onClick={() => setActiveServer(server.id)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-[10px] font-bold transition-all border ${
                  activeServer === server.id 
                    ? 'bg-brand text-white border-brand shadow-[0_0_12px_rgba(229,9,20,0.5)]' 
                    : 'bg-white/5 border-white/5 text-text-2 hover:bg-white/10'
                }`}
              >
                {server.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold text-brand uppercase tracking-widest px-3 py-1 bg-brand/10 rounded-full border border-brand/20">
              Streaming via {VIDEO_SERVERS.find(s => s.id === activeServer)?.name}
            </span>
            
            {type === 'tv' && (
               <div className="flex items-center gap-3">
                 <div className="flex items-center gap-2 bg-white/5 rounded-lg border border-white/5 px-2">
                   <span className="text-[10px] font-bold text-text-3 uppercase">S</span>
                   <input 
                     type="number" 
                     value={season} 
                     onChange={(e) => setSeason(parseInt(e.target.value) || 1)}
                     className="bg-transparent text-sm font-bold w-10 py-1.5 outline-none text-center"
                   />
                 </div>
                 <div className="flex items-center gap-2 bg-white/5 rounded-lg border border-white/5 px-2">
                   <span className="text-[10px] font-bold text-text-3 uppercase">E</span>
                   <input 
                     type="number" 
                     value={episode} 
                     onChange={(e) => setEpisode(parseInt(e.target.value) || 1)}
                     className="bg-transparent text-sm font-bold w-10 py-1.5 outline-none text-center"
                   />
                 </div>
               </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 pt-8">
        {!data ? (
           <div className="flex flex-col items-center justify-center py-20 space-y-4">
             <p className="text-text-3 font-medium">Fetching details...</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-3 space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-[900] text-white tracking-tight leading-tight">{title}</h1>
              <div className="flex flex-wrap items-center gap-3">
                <div className="bg-gold text-bg-base px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {data.vote_average.toFixed(1)}
                </div>
                <div className="glass px-2 py-0.5 rounded text-xs font-medium text-text-2">{year}</div>
                <div className="glass px-2 py-0.5 rounded text-xs font-medium text-text-2 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {runtime} min
                </div>
                {data.genres?.map(g => (
                  <div key={g.id} className="glass px-2 py-0.5 rounded text-xs font-medium text-text-2">{g.name}</div>
                ))}
              </div>
              <p className="text-lg text-text-3 italic font-medium">"{data.tagline || 'Experience the magic.'}"</p>
            </div>

            <div className="flex flex-wrap items-center gap-4 border-y border-white/5 py-6">
              <button 
                onClick={() => toggleWatchlist({
                   id: data.id,
                   type,
                   title,
                   poster: data.poster_path,
                   rating: data.vote_average,
                   year
                })}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${
                  isInWatchlist(data.id) ? 'bg-brand/20 text-brand' : 'bg-white/5 text-white hover:bg-white/10'
                }`}
              >
                <Plus className={`w-5 h-5 transition-transform ${isInWatchlist(data.id) ? 'rotate-45' : ''}`} />
                {isInWatchlist(data.id) ? 'In My List' : 'Add to List'}
              </button>
              <button className="bg-white/5 text-white hover:bg-[#25D366]/20 hover:text-[#25D366] p-2.5 rounded-xl transition-all">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="bg-white/5 text-white hover:bg-accent/20 hover:text-accent p-2.5 rounded-xl transition-all">
                <Copy className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-8 border-b border-white/5">
                {(['overview', 'cast'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${
                      activeTab === tab ? 'text-brand' : 'text-text-3 hover:text-white'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-brand" />
                    )}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'overview' && (
                    <p className="text-text-2 text-lg leading-relaxed max-w-4xl">{data.overview}</p>
                  )}
                  {activeTab === 'cast' && (
                    <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-4">
                      {data.credits?.cast?.slice(0, 15).map((person: Cast) => (
                        <div key={person.id} className="shrink-0 w-24 text-center space-y-2">
                          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-bg-surface-2 border-2 border-transparent hover:border-brand transition-all">
                            {person.profile_path ? (
                               <Image 
                                 src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                                 alt={person.name}
                                 fill
                                 className="object-cover"
                                 referrerPolicy="no-referrer"
                               />
                            ) : (
                               <div className="w-full h-full flex items-center justify-center text-text-3">NA</div>
                            )}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white line-clamp-1">{person.name}</p>
                            <p className="text-[10px] text-text-3 line-clamp-1">{person.character}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="pt-8 border-t border-white/5">
              <ContentRow 
                title="Recommended for You" 
                items={similar} 
                isLoading={!similar}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8 hidden lg:block">
            <div className="bg-bg-surface rounded-2xl p-6 border border-white/5 space-y-6">
              <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl">
                <Image 
                  src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                  alt={title}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                   <span className="text-[10px] font-bold text-text-3 uppercase tracking-widest">Released</span>
                   <span className="text-white font-medium">{year}</span>
                </div>
                <div className="flex flex-col gap-1">
                   <span className="text-[10px] font-bold text-text-3 uppercase tracking-widest">Runtime</span>
                   <span className="text-white font-medium">{runtime} min</span>
                </div>
                <div className="flex flex-col gap-1">
                   <span className="text-[10px] font-bold text-text-3 uppercase tracking-widest">Type</span>
                   <span className="text-brand font-bold uppercase">{type}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
