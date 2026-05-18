'use client';

import React from 'react';

export default function TelegramBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 h-10 bg-brand text-white z-[60] flex items-center justify-center gap-3 px-4 shadow-lg">
      <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase truncate">
        Join our Telegram channel for the latest movies & updates!
      </span>
      <a 
        href="https://t.me/yourchannel" 
        target="_blank" 
        rel="noopener noreferrer"
        className="shrink-0 bg-white text-brand px-3 py-1 rounded-full text-[10px] font-[900] hover:bg-white/90 transition-all uppercase shadow-md hover:scale-105 active:scale-95"
      >
        Join Now
      </a>
    </div>
  );
}
