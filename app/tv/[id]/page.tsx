'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useTMDB } from '@/hooks/useTMDB';
import { Media, TMDBResponse } from '@/types/tmdb';
import DetailView from '@/components/DetailView';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';

export default function TVPage() {
  const { id } = useParams();
  
  const { data: show, isLoading } = useTMDB<Media>(`tv/${id}`, { append_to_response: 'credits' });
  const { data: similar } = useTMDB<TMDBResponse<Media>>(`tv/${id}/similar`);

  return (
    <main>
      <Navbar />
      <DetailView 
        id={id as string} 
        type="tv" 
        data={show} 
        similar={similar?.results} 
        isLoading={isLoading} 
      />
      <BottomNav />
    </main>
  );
}
