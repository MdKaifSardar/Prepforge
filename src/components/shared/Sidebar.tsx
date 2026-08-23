'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Pattern } from '@/lib/models/dsa.types';
import { Layers } from 'lucide-react';

interface SidebarProps {
  patterns: Pattern[];
}

export function Sidebar({ patterns }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-16 bottom-0 hidden w-64 border-r border-zinc-200 bg-white/60 backdrop-blur-md overflow-y-auto p-4 lg:block dark:border-zinc-800/80 dark:bg-zinc-950/60">
      <div className="mb-3 flex items-center gap-2 px-3 text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
        <Layers className="h-3.5 w-3.5" />
        <span>Core Patterns ({patterns.length})</span>
      </div>

      <nav className="space-y-1">
        {patterns.map((pattern) => {
          const numStr = String(pattern.id).padStart(2, '0');
          const isSelected = pathname === `/dsa/${pattern.id}`;

          return (
            <Link
              key={pattern.id}
              href={`/dsa/${pattern.id}`}
              className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-all ${
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
  );
}
