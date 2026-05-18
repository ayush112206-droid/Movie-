'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Bell, Menu, X, Play, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import SearchBar from './SearchBar';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 60);

      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -140 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-10 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-brand p-1.5 rounded-md group-hover:scale-110 transition-transform">
              <Play className="w-5 h-5 fill-white text-white" />
            </div>
            <span className="text-2xl font-[900] tracking-tighter text-white">V8</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/movies" className="text-sm font-medium text-text-2 hover:text-white transition-colors">Movies</Link>
            <Link href="/tv" className="text-sm font-medium text-text-2 hover:text-white transition-colors">TV Shows</Link>
            <Link href="/watchlist" className="text-sm font-medium text-text-2 hover:text-brand transition-colors flex items-center gap-1.5">
              <Heart className="w-4 h-4" />
              My List
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="https://t.me/yourchannel" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-2 bg-brand/10 hover:bg-brand text-brand hover:text-white px-4 py-1.5 rounded-full text-xs font-bold transition-all border border-brand/20 group"
          >
            <span className="group-hover:scale-110 transition-transform">Join Telegram</span>
          </a>

          <div className="hidden md:block">
            <SearchBar />
          </div>

          <button 
            className="md:hidden p-2 text-text-2 hover:text-white"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="w-6 h-6" />
          </button>

          <button className="p-2 text-text-2 hover:text-white relative">
            <Bell className="w-6 h-6" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-brand rounded-full border-2 border-bg-base"></span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-bg-base/95 p-4 flex flex-col md:hidden"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="text-xl font-bold">Search</span>
              <div className="flex items-center gap-4">
                <a 
                  href="https://t.me/yourchannel" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-brand/10 text-brand px-3 py-1 rounded-full text-[10px] font-bold border border-brand/20"
                >
                  Join Telegram
                </a>
                <button onClick={() => setIsSearchOpen(false)}>
                  <X className="w-8 h-8" />
                </button>
              </div>
            </div>
            <SearchBar autoFocus onSelect={() => setIsSearchOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
