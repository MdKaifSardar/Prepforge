'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Code2, Search, Sun, Moon, Zap, Layers, BookOpen, Database } from 'lucide-react';
import { UserAvatarMenu } from '@/features/auth/components/UserAvatarMenu';

interface NavbarProps {
  onSearch?: (query: string) => void;
  onToggleRevisionMode?: () => void;
  isRevisionMode?: boolean;
}

export function Navbar({
  onSearch,
  onToggleRevisionMode,
  isRevisionMode = false,
}: NavbarProps) {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (onSearch) onSearch(val);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-full items-center justify-between px-4 sm:px-6">
        {/* Brand Group */}
        <div className="flex items-center gap-3 sm:gap-6">
          <Link href="/" className="flex items-center gap-2.5 text-zinc-900 transition-opacity hover:opacity-90 dark:text-white">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/20 dark:bg-indigo-500">
              <Code2 className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold text-sm sm:text-base tracking-tight">Prepforge</span>
              <span className="ml-2 hidden rounded-full border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-600 sm:inline-block dark:border-indigo-900/50 dark:bg-indigo-950/50 dark:text-indigo-400">
                SDE Sheet
              </span>
            </div>
          </Link>

          {/* Module Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 border-l border-zinc-200 pl-6 dark:border-zinc-800">
            <Link
              href="/"
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                pathname === '/' || pathname.startsWith('/dsa')
                  ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400'
                  : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900'
              }`}
            >
              <Layers className="h-4 w-4" />
              <span>DSA Patterns</span>
            </Link>
            <Link
              href="/dbms"
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                pathname.startsWith('/dbms')
                  ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400'
                  : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>DBMS Revision</span>
            </Link>
            <Link
              href="/sql"
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                pathname.startsWith('/sql')
                  ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400'
                  : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900'
              }`}
            >
              <Database className="h-4 w-4" />
              <span>SQL Practice</span>
            </Link>
          </nav>
        </div>

        {/* Search Bar */}
        <div className="relative hidden max-w-xs flex-1 sm:block md:max-w-md mx-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search patterns, cues, problems..."
            className="w-full rounded-full border border-zinc-200 bg-zinc-50 py-1.5 pl-9 pr-4 text-xs font-medium text-zinc-900 transition-all placeholder:text-zinc-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-indigo-500 dark:focus:bg-zinc-950"
          />
        </div>

        {/* Actions Group */}
        <div className="flex items-center gap-2 sm:gap-3">
          {onToggleRevisionMode && (
            <button
              onClick={onToggleRevisionMode}
              className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-all ${
                isRevisionMode
                  ? 'border-amber-400 bg-amber-50 text-amber-600 dark:border-amber-800/50 dark:bg-amber-950/50 dark:text-amber-400'
                  : 'border-zinc-200 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900'
              }`}
              title="Quick Revision Mode"
            >
              <Zap className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Quick Revision</span>
            </button>
          )}

          {/* Theme Switcher */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-600" />}
            </button>
          )}

          {/* User Profile Avatar & Dropdown */}
          <UserAvatarMenu />
        </div>
      </div>
    </header>
  );
}
