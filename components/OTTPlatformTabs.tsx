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
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all border ${
                isActive 
                  ? 'bg-brand border-brand text-white shadow-[0_0_15px_rgba(229,9,20,0.3)]' 
                  : 'bg-[#16161c] border-white/10 text-text-3 hover:text-white hover:border-white/20'
              }`}
            >
              {platform.name}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
