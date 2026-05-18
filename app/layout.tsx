import type { Metadata, Viewport } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'V8 | Premium Movie Streaming',
  description: 'Watch the latest movies and TV shows in ultra high definition. Premium streaming experience with multiple servers and collection browsing.',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#060608',
};

import { ToastProvider } from '@/components/Toast';
import TelegramBanner from '@/components/TelegramBanner';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable}`}>
      <body suppressHydrationWarning className="bg-bg-base overflow-x-hidden selection:bg-brand/30 selection:text-white pt-10">
        <TelegramBanner />
        <ToastProvider>
          {children}
        </ToastProvider>
        {/* Progress Bar placeholder - in a real app would use a more robust router events listener */}
        <div className="fixed top-0 left-0 right-0 h-[3px] z-[100] bg-gradient-to-r from-brand via-accent to-brand bg-[length:200%_100%] animate-[shimmer_2s_infinite] shadow-[0_0_8px_rgba(229,9,20,0.5)] pointer-events-none opacity-0 group-data-[loading=true]:opacity-100 transition-opacity" />
      </body>
    </html>
  );
}
