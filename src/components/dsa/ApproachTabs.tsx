'use client';

import React from 'react';
import { Flame, Sparkles } from 'lucide-react';

interface ApproachTabsProps {
  activeApproach: 'brute' | 'optimal';
  onSelect: (approach: 'brute' | 'optimal') => void;
}

export function ApproachTabs({ activeApproach, onSelect }: ApproachTabsProps) {
  return (
    <div className="my-4 flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800">
      <button
        onClick={() => onSelect('brute')}
        className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition-all ${
          activeApproach === 'brute'
            ? 'border-amber-500 text-amber-600 dark:text-amber-400'
            : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
        }`}
      >
        <Flame className="h-4 w-4" />
        <span>Brute Force Approach</span>
      </button>

      <button
        onClick={() => onSelect('optimal')}
        className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition-all ${
          activeApproach === 'optimal'
            ? 'border-indigo-600 text-indigo-600 dark:border-indigo-500 dark:text-indigo-400'
            : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
        }`}
      >
        <Sparkles className="h-4 w-4" />
        <span>Optimal Approach (Recommended)</span>
      </button>
    </div>
  );
}
