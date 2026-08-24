'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { DashboardSidebar, DashboardTab } from '../dashboard/DashboardSidebar';
import { DsaService } from '@/lib/services/dsa.service';
import { Pattern } from '@/lib/models/dsa.types';
import { ProfileDashboardView } from '@/features/auth/components/ProfileDashboardView';

const AUTH_PATHS = ['/login', '/signup', '/forgot-password'];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [isDsaSidebarOpen, setIsDsaSidebarOpen] = useState(true);
  const [isDashSidebarOpen, setIsDashSidebarOpen] = useState(true);
  const [dashboardTab, setDashboardTab] = useState<DashboardTab>('overview');
  
  const pathname = usePathname();
  const isAuthPage = AUTH_PATHS.some(path => pathname === path || pathname.startsWith(`${path}/`));
  const isDashboardPage = pathname === '/dashboard' || pathname.startsWith('/dashboard/');

  useEffect(() => {
    DsaService.getPatterns().then(setPatterns);
  }, []);

  // Responsive Drawer guard for screen transitions
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setIsDsaSidebarOpen(false);
      setIsDashSidebarOpen(false);
    }
  }, [pathname]);

  const handleDsaClose = useCallback(() => setIsDsaSidebarOpen(false), []);
  const handleDsaToggle = useCallback(() => setIsDsaSidebarOpen(prev => !prev), []);

  const handleDashClose = useCallback(() => setIsDashSidebarOpen(false), []);
  const handleDashToggle = useCallback(() => setIsDashSidebarOpen(prev => !prev), []);

  // Case 1: Auth Pages (Standalone Full-Screen, No Navbar, No Sidebar)
  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col justify-center">
        {children}
      </div>
    );
  }

  // Case 2: Dashboard Page (Navbar + Account Controls Sidebar)
  if (isDashboardPage) {
    return (
      <>
        <Navbar />
        <div className="pt-16 min-h-[calc(100vh-4rem)] flex">
          <DashboardSidebar
            activeTab={dashboardTab}
            onTabChange={setDashboardTab}
            isOpen={isDashSidebarOpen}
            onToggle={handleDashToggle}
            onClose={handleDashClose}
          />
          <div
            className={`flex-1 w-full transition-all duration-300 ease-in-out ${
              isDashSidebarOpen ? 'lg:pl-72' : 'lg:pl-0'
            }`}
          >
            <ProfileDashboardView activeTab={dashboardTab} />
          </div>
        </div>
      </>
    );
  }

  // Case 3: Domain Learning Pages (Navbar + DSA Patterns Navigation Sidebar)
  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-[calc(100vh-4rem)] flex">
        <Sidebar
          patterns={patterns}
          isOpen={isDsaSidebarOpen}
          onToggle={handleDsaToggle}
          onClose={handleDsaClose}
        />
        <div
          className={`flex-1 w-full transition-all duration-300 ease-in-out ${
            isDsaSidebarOpen ? 'lg:pl-72' : 'lg:pl-0'
          }`}
        >
          {children}
        </div>
      </div>
    </>
  );
}
