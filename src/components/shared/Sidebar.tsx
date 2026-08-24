'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Pattern } from '@/lib/models/dsa.types';
import { Layers, BookOpen, Database, ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  patterns: Pattern[];
  isOpen?: boolean;
  onToggle?: () => void;
  onClose?: () => void;
}

export function Sidebar({ patterns, isOpen = true, onToggle, onClose }: SidebarProps) {
  const pathname = usePathname();
  const isLoading = !patterns || patterns.length === 0;

  const handleNavClick = () => {
    // Only close sidebar drawer on mobile devices (<1024px)
    if (typeof window !== 'undefined' && window.innerWidth < 1024 && onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-zinc-950/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Floating Side-Edge Open Trigger Button (Shown ONLY when Sidebar is Collapsed) */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed left-0 top-20 z-40 flex h-10 w-9 items-center justify-center rounded-r-xl border border-l-0 border-zinc-200 bg-white/90 shadow-lg backdrop-blur-md hover:bg-indigo-50 hover:w-11 dark:border-zinc-800 dark:bg-zinc-900/90 dark:hover:bg-indigo-950/50 transition-all text-zinc-700 dark:text-zinc-300 group"
          title="Expand Patterns Menu"
          aria-label="Expand Patterns Menu"
        >
          <ChevronRight className="h-5 w-5 text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
        </button>
      )}

      {/* Sidebar Navigation Drawer */}
      <aside
        className={`fixed left-0 top-16 bottom-0 z-40 w-72 border-r border-zinc-200 bg-white/95 backdrop-blur-md p-4 transition-transform duration-300 ease-in-out dark:border-zinc-800/80 dark:bg-zinc-950/95 overflow-y-auto ${
          isOpen ? 'translate-x-0 shadow-2xl lg:shadow-none' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header & Close Button */}
        <div className="mb-4 flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800/80">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
            <Layers className="h-4 w-4 text-indigo-500" />
            <span>Navigation Menu</span>
          </div>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900 transition-colors"
            title="Collapse Menu"
            aria-label="Collapse Menu"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>

        {/* Mobile Module Selector Links */}
        <div className="mb-4 space-y-1 lg:hidden border-b border-zinc-100 pb-3 dark:border-zinc-800/80">
          <Link
            href="/"
            onClick={handleNavClick}
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold ${
              pathname === '/' || pathname.startsWith('/dsa')
                ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400'
                : 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900'
            }`}
          >
            <Layers className="h-4 w-4" />
            <span>DSA Patterns</span>
          </Link>
          <Link
            href="/dbms"
            onClick={handleNavClick}
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold ${
              pathname.startsWith('/dbms')
                ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400'
                : 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>DBMS Revision</span>
          </Link>
          <Link
            href="/sql"
            onClick={handleNavClick}
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold ${
              pathname.startsWith('/sql')
                ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400'
                : 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900'
            }`}
          >
            <Database className="h-4 w-4" />
            <span>SQL Practice</span>
          </Link>
        </div>

        {/* Core Patterns Section Header */}
        <div className="mb-3 flex items-center justify-between px-2 text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          <span>Core Patterns {isLoading ? '' : `(${patterns.length})`}</span>
        </div>

        {/* Loading Skeleton Placeholders or Pattern Links */}
        <nav className="space-y-1">
          {isLoading ? (
            Array.from({ length: 12 }).map((_, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-xl px-3 py-2.5"
              >
                <div className="flex items-center gap-2.5 w-full">
                  <div className="h-3 w-5 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800/80" />
                  <div className="h-3 w-36 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800/60" />
                </div>
                <div className="h-4 w-6 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800/80" />
              </div>
            ))
          ) : (
            patterns.map((pattern, idx) => {
              const numStr = String(pattern.displayOrder || idx + 1).padStart(2, '0');
              const patternSlug = pattern.slug || String(pattern.id);
              const isSelected = pathname === `/dsa/${patternSlug}` || pathname.startsWith(`/dsa/${patternSlug}/`);

              return (
                <Link
                  key={pattern.id || patternSlug}
                  href={`/dsa/${patternSlug}`}
                  onClick={handleNavClick}
                  className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-indigo-600 text-white font-semibold shadow-sm shadow-indigo-600/30 dark:bg-indigo-600'
                      : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className={`font-mono text-[11px] ${isSelected ? 'text-indigo-200' : 'text-zinc-400 dark:text-zinc-500'}`}>
                      #{numStr}
                    </span>
                    <span className="truncate">{pattern.name}</span>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      isSelected
                        ? 'bg-indigo-700 text-white'
                        : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400'
                    }`}
                  >
                    {pattern.questions ? pattern.questions.length : (pattern.questionCount || 0)}
                  </span>
                </Link>
              );
            })
          )}
        </nav>
      </aside>
    </>
  );
}
