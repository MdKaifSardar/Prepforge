import React from 'react';
import Link from 'next/link';
import { Question } from '@/lib/models/dsa.types';
import { FileCode } from 'lucide-react';

interface ProblemCardProps {
  question: Question;
  subPatternName?: string;
}

export function ProblemCard({ question, subPatternName }: ProblemCardProps) {
  const slug = question.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');

  const diffBadgeClasses = {
    easy: 'border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-400',
    medium: 'border-amber-200 bg-amber-50 text-amber-600 dark:border-amber-900/40 dark:bg-amber-950/40 dark:text-amber-400',
    hard: 'border-red-200 bg-red-50 text-red-600 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-400',
  }[question.diff];

  return (
    <Link
      href={`/dsa/problem/${slug}`}
      className="group flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-4 transition-all hover:border-indigo-500 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-indigo-500 dark:hover:bg-zinc-900"
    >
      <div className="flex items-center gap-3 truncate">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 dark:group-hover:bg-indigo-950/50 dark:group-hover:text-indigo-400 transition-colors">
          <FileCode className="h-4 w-4" />
        </div>
        <div className="truncate">
          <div className="flex items-center gap-2 truncate">
            <span className="font-mono text-xs font-bold text-zinc-900 dark:text-white">
              {question.lcNum}
            </span>
            <span className="truncate text-xs font-semibold text-zinc-700 group-hover:text-indigo-600 dark:text-zinc-300 dark:group-hover:text-indigo-400 transition-colors">
              {question.title}
            </span>
          </div>
          {subPatternName && (
            <span className="mt-0.5 inline-block text-[11px] font-medium text-zinc-400 dark:text-zinc-500">
              {subPatternName}
            </span>
          )}
        </div>
      </div>

      <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-bold capitalize ${diffBadgeClasses}`}>
        {question.diff}
      </span>
    </Link>
  );
}
