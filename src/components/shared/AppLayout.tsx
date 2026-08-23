'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { DsaService } from '@/lib/services/dsa.service';
import { Pattern } from '@/lib/models/dsa.types';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    DsaService.getPatterns().then(setPatterns);
  }, []);

  // Only close mobile drawer on route transitions (keep open on desktop)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, [pathname]);

  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-[calc(100vh-4rem)] flex">
        <Sidebar
          patterns={patterns}
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div
          className={`flex-1 w-full transition-all duration-300 ease-in-out ${
            isSidebarOpen ? 'lg:pl-72' : 'lg:pl-0'
          }`}
        >
          {children}
        </div>
      </div>
    </>
  );
}
