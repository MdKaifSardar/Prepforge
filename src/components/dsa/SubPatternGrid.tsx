import React from 'react';
import Link from 'next/link';
import { SubPattern, Question } from '@/lib/models/dsa.types';
import { ArrowRight, Layers } from 'lucide-react';

interface SubPatternGridProps {
  patternId: number | string;
  patternSlug?: string;
  subPatterns: SubPattern[];
  questions: Question[];
}

export function SubPatternGrid({ patternId, patternSlug, subPatterns, questions }: SubPatternGridProps) {
  if (!subPatterns || subPatterns.length === 0) return null;

  const targetPatternSlug = patternSlug || String(patternId);

  return (
    <div className="mb-8 rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
          <Layers className="h-4 w-4 text-indigo-500" />
          <span>Sub-Pattern Blueprints</span>
        </div>
        <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-600 dark:border-indigo-900/50 dark:bg-indigo-950/50 dark:text-indigo-400">
          {subPatterns.length} Sub-patterns
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subPatterns.map((sp) => {
          const qCount = questions.filter(q => q.subPatternId === sp.id || q.subPatternSlug === sp.slug).length;
          const subSlug = sp.slug || sp.id;

          return (
            <Link
              key={sp.id || subSlug}
              href={`/dsa/${targetPatternSlug}/sub/${subSlug}`}
              className="group flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-indigo-500 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-indigo-500"
            >
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="text-sm font-bold text-zinc-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400 transition-colors">
                    {sp.name}
                  </h4>
                  <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                    {qCount} Qs
                  </span>
                </div>
                <p className="line-clamp-2 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {sp.cue || (sp.cues && sp.cues[0])}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                <span>Explore Dedicated Page</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
