'use client';

import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { OTT_PLATFORMS } from '@/lib/constants';

interface OTTPlatformTabsProps {
  activeId: number;
  onChange: (id: number) => void;
}

export default function OTTPlatformTabs({ activeId, onChange }: OTTPlatformTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full overflow-x-auto hide-scrollbar scroll-momentum px-4 md:px-8 py-4">
      <div className="flex items-center gap-3 w-max" ref={scrollRef}>
        {OTT_PLATFORMS.map((platform) => {
          const isActive = activeId === platform.id;
          return (
            <motion.button
              key={platform.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onChange(platform.id)}
              className={`flex-shrink-0 flex items-center justify-center h-10 px-6 rounded-full text-xs font-bold transition-all border ${
                isActive 
                  ? 'bg-brand/10 border-brand text-brand shadow-[0_0_15px_rgba(229,9,20,0.2)]' 
                  : 'bg-[#16161c] border-white/5 text-text-3 hover:text-white hover:border-white/20'
              }`}
            >
              {'logo' in platform && platform.logo ? (
                <img 
                  src={platform.logo} 
                  alt={platform.name} 
                  className="h-4 max-w-[80px] object-contain brightness-0 invert" 
                />
              ) : (
                <span>{platform.name}</span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
