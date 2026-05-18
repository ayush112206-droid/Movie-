'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import HeroSlider from '@/components/HeroSlider';
import OTTPlatformTabs from '@/components/OTTPlatformTabs';
import ContentRow from '@/components/ContentRow';
import StatBar from '@/components/StatBar';
import CollectionBanner from '@/components/CollectionBanner';
import ContinueWatching from '@/components/ContinueWatching';
import { useTMDB } from '@/hooks/useTMDB';
import { TMDBResponse, Media } from '@/types/tmdb';

export default function HomePage() {
  const [activePlatformId, setActivePlatformId] = useState(0);

  // Parallel fetching
  const { data: newReleases, isLoading: loadingNew } = useTMDB<TMDBResponse<Media>>('movie/now_playing');
  const { data: topRated, isLoading: loadingTop } = useTMDB<TMDBResponse<Media>>('movie/top_rated');
  const { data: popularTV, isLoading: loadingPopTV } = useTMDB<TMDBResponse<Media>>('tv/popular');
  const { data: netflixOriginals, isLoading: loadingNetflix } = useTMDB<TMDBResponse<Media>>('discover/tv', { with_networks: '213' });
  const { data: primeOriginals, isLoading: loadingPrime } = useTMDB<TMDBResponse<Media>>('discover/tv', { with_networks: '1024' });
  const { data: hindiMovies, isLoading: loadingHindi } = useTMDB<TMDBResponse<Media>>('discover/movie', { with_original_language: 'hi' });
  const { data: koreanDrama, isLoading: loadingKorean } = useTMDB<TMDBResponse<Media>>('discover/tv', { with_original_language: 'ko' });
  const { data: bengaliMovies, isLoading: loadingBengali } = useTMDB<TMDBResponse<Media>>('discover/movie', { with_original_language: 'bn' });
  const { data: actionMovies, isLoading: loadingAction } = useTMDB<TMDBResponse<Media>>('discover/movie', { with_genres: '28,53' });

  return (
    <main className="min-h-screen pb-24 md:pb-8">
      <Navbar />
      
      {/* Root Layout Header spacing handled by fixed navbar and hero slider mt-20 */}
      
      <OTTPlatformTabs activeId={activePlatformId} onChange={setActivePlatformId} />
      
      <HeroSlider />
      
      <StatBar />

      <ContinueWatching />

      <div className="space-y-4">
        <ContentRow 
          title="Netflix Originals" 
          items={netflixOriginals?.results} 
          isLoading={loadingNetflix} 
        />

        <ContentRow 
          title="Amazon Prime Originals" 
          items={primeOriginals?.results} 
          isLoading={loadingPrime} 
        />

        <ContentRow 
          title="New Releases" 
          items={newReleases?.results} 
          isLoading={loadingNew} 
          href="/movies?sort=now_playing"
        />
        
        <ContentRow 
          title="Top Rated Movies" 
          items={topRated?.results} 
          isLoading={loadingTop} 
          href="/movies?sort=top_rated"
        />

        <CollectionBanner 
          title="Marvel Cinematic Universe" 
          subtitle="Everything from Iron Man to Guardians of the Galaxy. All in ultra high definition."
          image="https://picsum.photos/seed/marvel/1920/1080"
          href="/search?q=Marvel"
          color="#E50914"
        />

        <ContentRow 
          title="Hindi Blockbusters" 
          items={hindiMovies?.results} 
          isLoading={loadingHindi} 
        />

        <ContentRow 
          title="Korean Masterpieces" 
          items={koreanDrama?.results} 
          isLoading={loadingKorean} 
        />

        <ContentRow 
          title="Bengali Classics" 
          items={bengaliMovies?.results} 
          isLoading={loadingBengali} 
        />

        <ContentRow 
          title="Action & Thriller" 
          items={actionMovies?.results} 
          isLoading={loadingAction} 
        />

        <ContentRow 
          title="Popular Web Series" 
          items={popularTV?.results} 
          isLoading={loadingPopTV} 
          href="/tv?sort=popular"
        />
      </div>

      <BottomNav />
    </main>
  );
}
