import React from 'react';
import Link from 'next/link';
import { Pattern } from '@/lib/models/dsa.types';
import { ArrowRight, Layers, HelpCircle } from 'lucide-react';

interface PatternCardProps {
  pattern: Pattern;
}

export function PatternCard({ pattern }: PatternCardProps) {
  const numStr = String(pattern.displayOrder || pattern.id || 1).padStart(2, '0');
  const patternSlug = pattern.slug || String(pattern.id);
  const hasSubPatterns = pattern.subPatterns && pattern.subPatterns.length > 0;
  const subCount = pattern.subPatterns ? pattern.subPatterns.length : 0;
  const cuesSnippet = pattern.cues ? pattern.cues.slice(0, 3).join(' • ') : '';
  const questionCount = pattern.questions ? pattern.questions.length : (pattern.questionCount || 0);

  return (
    <Link
      href={`/dsa/${patternSlug}`}
      className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-indigo-500/50 dark:hover:bg-zinc-900"
    >
      <div className="absolute top-0 left-0 h-full w-1 rounded-l-2xl bg-indigo-600 opacity-0 transition-opacity group-hover:opacity-100 dark:bg-indigo-500" />

      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
            #{numStr}
          </span>
          {hasSubPatterns ? (
            <span className="rounded-full border border-purple-200 bg-purple-50 px-2.5 py-0.5 text-[11px] font-semibold text-purple-600 dark:border-purple-900/40 dark:bg-purple-950/40 dark:text-purple-400">
              {subCount} Sub-patterns
            </span>
          ) : (
            <span className="rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-0.5 text-[11px] font-semibold text-cyan-600 dark:border-cyan-900/40 dark:bg-cyan-950/40 dark:text-cyan-400">
              Direct Questions
            </span>
          )}
        </div>

        <h3 className="mb-2 text-base font-bold text-zinc-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400 transition-colors">
          {pattern.name}
        </h3>

        <p className="line-clamp-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
          {cuesSnippet}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-800/60">
        <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <HelpCircle className="h-3.5 w-3.5" />
          <span>{questionCount} Questions</span>
        </div>

        <div className="flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
          <span>Explore</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </Link>
  );
}
