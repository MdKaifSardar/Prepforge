'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { DsaService } from '@/lib/services/dsa.service';
import { Pattern } from '@/lib/models/dsa.types';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    DsaService.getPatterns().then(setPatterns);
  }, []);

  // Close mobile sidebar on route transitions
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  return (
    <>
      <Navbar
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />
      <div className="pt-16 min-h-[calc(100vh-4rem)] flex">
        <Sidebar
          patterns={patterns}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div className="flex-1 w-full lg:pl-72 transition-all">
          {children}
        </div>
      </div>
    </>
  );
}
