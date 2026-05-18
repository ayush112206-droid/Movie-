'use client';

import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { VIDEO_SERVERS } from '@/lib/constants';

interface VideoPlayerProps {
  id: string;
  type: 'movie' | 'tv';
  season?: number;
  episode?: number;
  currentServer: number;
}

export default function VideoPlayer({ id, type, season = 1, episode = 1, currentServer }: VideoPlayerProps) {
  const [embedUrl, setEmbedUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Anti-popup logic similar to the provided HTML file
    const preventPopups = () => {
      if (typeof window !== 'undefined') {
        const _origOpen = window.open;
        window.open = (url: string | URL | undefined, target?: string, features?: string) => {
          console.warn('Blocked popup:', url);
          return null;
        };
        return () => { window.open = _origOpen; };
      }
    };
    return preventPopups();
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/player?id=${id}&type=${type}&server=${currentServer}&s=${season}&e=${episode}`)
      .then(res => res.json())
      .then(data => {
        setEmbedUrl(data.url);
      });
  }, [id, type, season, episode, currentServer]);

  return (
    <div className="relative w-full aspect-video bg-black overflow-hidden shadow-2xl">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-bg-base">
          <Loader2 className="w-12 h-12 text-brand animate-spin" />
        </div>
      )}
      {embedUrl && (
        <iframe
          src={embedUrl}
          className="w-full h-full border-none"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          onLoad={() => setLoading(false)}
        />
      )}
    </div>
  );
}
