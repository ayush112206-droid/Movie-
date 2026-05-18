'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface CollectionBannerProps {
  title: string;
  subtitle: string;
  image: string;
  href: string;
  color?: string;
}

export default function CollectionBanner({ title, subtitle, image, href, color = 'var(--brand)' }: CollectionBannerProps) {
  return (
    <div className="px-4 md:px-8 py-8 w-full">
      <Link href={href}>
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="relative w-full h-[240px] md:h-[300px] rounded-3xl overflow-hidden group"
          style={{ backgroundColor: 'var(--bg-surface)' }}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-1000 opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bg-base via-bg-base/60 to-transparent" />
          
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-[900] tracking-widest uppercase" style={{ color }}>NEW COLLECTION</p>
              <h2 className="text-3xl md:text-5xl font-[900] text-white tracking-tight">{title}</h2>
            </div>
            <p className="text-text-2 max-w-md hidden md:block">{subtitle}</p>
            <div 
              className="flex items-center gap-2 font-bold px-6 py-3 rounded-xl w-max transition-all"
              style={{ backgroundColor: color, color: '#fff' }}
            >
              Explore Collection <ChevronRight className="w-5 h-5" />
            </div>
          </div>
        </motion.div>
      </Link>
    </div>
  );
}
