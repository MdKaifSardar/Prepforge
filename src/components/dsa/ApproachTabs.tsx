'use client';

import React from 'react';
import { Flame, Sparkles } from 'lucide-react';

interface ApproachTabsProps {
  activeApproach: 'brute' | 'optimal';
  onSelect: (approach: 'brute' | 'optimal') => void;
}

export function ApproachTabs({ activeApproach, onSelect }: ApproachTabsProps) {
  return (
    <div className="my-2 flex max-w-full items-center gap-1.5 overflow-x-auto border-b border-zinc-200 pb-0.5 dark:border-zinc-800 scrollbar-none sm:my-4 sm:gap-2">
      <button
        onClick={() => onSelect('brute')}
        className={`flex shrink-0 items-center gap-1.5 border-b-2 px-3 py-2 text-xs font-semibold whitespace-nowrap transition-all sm:gap-2 sm:px-4 sm:py-2.5 ${
          activeApproach === 'brute'
            ? 'border-amber-500 text-amber-600 dark:text-amber-400'
            : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
        }`}
      >
        <Flame className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        <span>Brute Force Approach</span>
      </button>

      <button
        onClick={() => onSelect('optimal')}
        className={`flex shrink-0 items-center gap-1.5 border-b-2 px-3 py-2 text-xs font-semibold whitespace-nowrap transition-all sm:gap-2 sm:px-4 sm:py-2.5 ${
          activeApproach === 'optimal'
            ? 'border-indigo-600 text-indigo-600 dark:border-indigo-500 dark:text-indigo-400'
            : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
        }`}
      >
        <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        <span>Optimal Approach <span className="hidden sm:inline">(Recommended)</span></span>
      </button>
    </div>
  );
}

