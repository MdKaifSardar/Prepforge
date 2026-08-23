'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Pattern } from '@/lib/models/dsa.types';
import { Layers, X, BookOpen, Database } from 'lucide-react';

interface SidebarProps {
  patterns: Pattern[];
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ patterns, isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-zinc-950/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Navigation Drawer */}
      <aside
        className={`fixed left-0 top-16 bottom-0 z-40 w-72 border-r border-zinc-200 bg-white/95 backdrop-blur-md p-4 transition-transform duration-300 dark:border-zinc-800/80 dark:bg-zinc-950/95 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Mobile Header Close Button & Module Shortcuts */}
        <div className="mb-4 flex items-center justify-between border-b border-zinc-100 pb-3 lg:hidden dark:border-zinc-800/80">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
            <Layers className="h-4 w-4 text-indigo-500" />
            <span>Navigation Menu</span>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Mobile Module Selector Links */}
        <div className="mb-4 space-y-1 lg:hidden border-b border-zinc-100 pb-3 dark:border-zinc-800/80">
          <Link
            href="/"
            onClick={onClose}
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
            onClick={onClose}
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
            onClick={onClose}
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

        {/* Patterns Header */}
        <div className="mb-3 flex items-center justify-between px-2 text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          <span>Core Patterns ({patterns.length})</span>
        </div>

        {/* Pattern Links */}
        <nav className="space-y-1">
          {patterns.map((pattern) => {
            const numStr = String(pattern.id).padStart(2, '0');
            const isSelected = pathname === `/dsa/${pattern.id}`;

            return (
              <Link
                key={pattern.id}
                href={`/dsa/${pattern.id}`}
                onClick={onClose}
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
                  {pattern.questions.length}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
