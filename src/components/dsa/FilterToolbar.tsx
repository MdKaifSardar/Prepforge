'use client';

import React from 'react';
import { SubPattern } from '@/lib/models/dsa.types';
import { Filter, Layers } from 'lucide-react';

interface FilterToolbarProps {
  subPatterns?: SubPattern[];
  activeSubPatternId: string;
  onSelectSubPattern: (subId: string) => void;
  activeDiff: string;
  onSelectDiff: (diff: 'all' | 'easy' | 'medium' | 'hard') => void;
}

export function FilterToolbar({
  subPatterns,
  activeSubPatternId,
  onSelectSubPattern,
  activeDiff,
  onSelectDiff,
}: FilterToolbarProps) {
  const hasSubPatterns = subPatterns && subPatterns.length > 0;

  return (
    <div className="mb-6 space-y-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
      {/* Sub-Pattern Filter Pills */}
      {hasSubPatterns && (
        <div className="border-b border-zinc-100 pb-3 dark:border-zinc-800/80 space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            <Layers className="h-3.5 w-3.5 text-indigo-500" />
            <span>Sub-Pattern Filter</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-1 px-1">
            <button
              onClick={() => onSelectSubPattern('all')}
              className={`shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                activeSubPatternId === 'all'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'border border-zinc-200 bg-zinc-50 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white'
              }`}
            >
              All Sub-patterns
            </button>
            {subPatterns.map((sp) => (
              <button
                key={sp.id}
                onClick={() => onSelectSubPattern(sp.id)}
                className={`shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  activeSubPatternId === sp.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'border border-zinc-200 bg-zinc-50 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white'
                }`}
              >
                {sp.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Difficulty Filter Pills */}
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
          <Filter className="h-3.5 w-3.5 text-indigo-500" />
          <span>Difficulty:</span>
        </div>

        <div className="flex w-full sm:w-auto items-center gap-1 rounded-xl border border-zinc-200 bg-zinc-100 p-1 dark:border-zinc-800 dark:bg-zinc-950">
          {(['all', 'easy', 'medium', 'hard'] as const).map((diff) => (
            <button
              key={diff}
              onClick={() => onSelectDiff(diff)}
              className={`flex-1 sm:flex-initial text-center rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-all ${
                activeDiff === diff
                  ? 'bg-indigo-600 text-white shadow-sm dark:bg-indigo-600'
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
