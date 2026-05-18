'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useTMDB } from '@/hooks/useTMDB';
import { Media, TMDBResponse } from '@/types/tmdb';
import DetailView from '@/components/DetailView';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';

export default function MoviePage() {
  const { id } = useParams();
  
  const { data: movie, isLoading } = useTMDB<Media>(`movie/${id}`, { append_to_response: 'credits' });
  const { data: similar } = useTMDB<TMDBResponse<Media>>(`movie/${id}/similar`);

  return (
    <main>
      <Navbar />
      <DetailView 
        id={id as string} 
        type="movie" 
        data={movie} 
        similar={similar?.results} 
        isLoading={isLoading} 
      />
      <BottomNav />
    </main>
  );
}
