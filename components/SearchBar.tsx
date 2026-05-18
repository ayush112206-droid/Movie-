'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, Mic, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';
import { useTMDB } from '@/hooks/useTMDB';
import { TMDBResponse, Media } from '@/types/tmdb';
import SearchDropdown from './SearchDropdown';

interface SearchBarProps {
  autoFocus?: boolean;
  onSelect?: () => void;
}

export default function SearchBar({ autoFocus, onSelect }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const debouncedQuery = useDebounce(query, 280);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const { data } = useTMDB<TMDBResponse<Media>>(
    debouncedQuery.length >= 2 ? 'search/multi' : null,
    { query: debouncedQuery }
  );

  useEffect(() => {
    const stored = localStorage.getItem('v8_recent_searches');
    if (stored) setRecentSearches(JSON.parse(stored));
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;

    const newRecent = [query, ...recentSearches.filter((s) => s !== query)].slice(0, 8);
    setRecentSearches(newRecent);
    localStorage.setItem('v8_recent_searches', JSON.stringify(newRecent));

    router.push(`/search?q=${encodeURIComponent(query)}`);
    setIsFocused(false);
    onSelect?.();
  };

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice search not supported in this browser');
      return;
    }
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setQuery(text);
    };
    recognition.start();
  };

  return (
    <div className="relative w-full max-w-md">
      <form 
        onSubmit={handleSearch}
        className={`flex items-center glass rounded-full px-4 py-2 transition-all duration-300 border border-white/5 ${
          isFocused ? 'ring-2 ring-brand w-[300px] md:w-[380px]' : 'w-full md:w-[300px]'
        }`}
      >
        <Search className="w-5 h-5 text-text-3 mr-2" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          autoFocus={autoFocus}
          placeholder="Movies, shows and more..."
          className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-text-3"
        />
        {query && (
          <button type="button" onClick={() => setQuery('')} className="p-1 hover:text-white text-text-3">
            <X className="w-4 h-4" />
          </button>
        )}
        <button 
          type="button" 
          onClick={handleVoiceSearch}
          className="p-1 hover:text-brand text-text-3 ml-1"
        >
          <Mic className="w-4 h-4" />
        </button>
      </form>

      {isFocused && (debouncedQuery.length >= 2 || recentSearches.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 z-[70]">
          <SearchDropdown 
             results={data?.results} 
             recents={recentSearches}
             onSelect={(q) => {
               if (q) setQuery(q);
               setIsFocused(false);
               onSelect?.();
             }}
          />
        </div>
      )}

      {isFocused && (
        <div 
          className="fixed inset-0 -z-10" 
          onClick={() => setIsFocused(false)}
        />
      )}
    </div>
  );
}
