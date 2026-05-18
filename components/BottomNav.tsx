'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Film, Tv, Search, Heart } from 'lucide-react';
import { motion } from 'motion/react';

const tabs = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/movies', label: 'Movies', icon: Film },
  { href: '/tv', label: 'TV Shows', icon: Tv },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/watchlist', label: 'My List', icon: Heart },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden h-16 safe-padding-bottom" style={{ background: 'rgba(14, 14, 18, 0.85)', backdropFilter: 'blur(30px)', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
      <div className="flex items-center justify-around h-full px-2">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;

          return (
            <Link key={tab.href} href={tab.href} className="relative flex flex-col items-center justify-center flex-1 py-1">
              <motion.div
                animate={{ scale: isActive ? 1.2 : 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className={`${isActive ? 'text-brand' : 'text-text-3'}`}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`} />
              </motion.div>
              <span className={`text-[10px] mt-1 font-medium ${isActive ? 'text-brand' : 'text-text-3'}`}>
                {tab.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="bottomNavDot"
                  className="absolute -top-1 w-1 h-1 bg-brand rounded-full"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
