'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Question, Pattern } from '@/lib/models/dsa.types';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { ApproachTabs } from '@/components/dsa/ApproachTabs';
import { CodeBox } from '@/components/dsa/CodeBox';
import { formatMarkdownToHtml } from '@/lib/utils/markdown';
import { ExternalLink, ChevronLeft, ChevronRight, FileCode, Flame, Sparkles } from 'lucide-react';

interface ProblemDetailViewProps {
  question: Question;
  pattern: Pattern;
  index: number;
  total: number;
  prevQ?: Question;
  nextQ?: Question;
}

export function ProblemDetailView({
  question,
  pattern,
  index,
  total,
  prevQ,
  nextQ,
}: ProblemDetailViewProps) {
  const [activeApproach, setActiveApproach] = useState<'brute' | 'optimal'>('optimal');

  const slug = question.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
  const currentSolution = activeApproach === 'optimal' ? question.optimal : question.bruteForce;
  const isOptimal = activeApproach === 'optimal';

  const prevSlug = prevQ ? prevQ.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-') : undefined;
  const nextSlug = nextQ ? nextQ.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-') : undefined;

  const diffBadgeClasses = {
    easy: 'border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-400',
    medium: 'border-amber-200 bg-amber-50 text-amber-600 dark:border-amber-900/40 dark:bg-amber-950/40 dark:text-amber-400',
    hard: 'border-red-200 bg-red-50 text-red-600 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-400',
  }[question.diff];

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        backHref={`/dsa/${pattern.id}`}
        backLabel={`Back to ${pattern.name}`}
        items={[
          { label: 'Patterns', href: '/' },
          { label: pattern.name, href: `/dsa/${pattern.id}` },
          { label: `${question.lcNum}: ${question.title}` },
        ]}
      />

      {/* Problem Header Card */}
      <div className="mb-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                {question.lcNum}
              </span>
              <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold capitalize ${diffBadgeClasses}`}>
                {question.diff}
              </span>
              <span className="text-xs text-zinc-400 dark:text-zinc-500">
                Problem {index} of {total} in {pattern.name}
              </span>
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              {question.title}
            </h1>
          </div>

          {question.url && (
            <a
              href={question.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition-colors"
            >
              <span>Solve on LeetCode</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>

        {/* Problem Statement */}
        {question.statement && (
          <div className="mt-6 border-t border-zinc-100 pt-6 dark:border-zinc-800/80">
            <div className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              <FileCode className="h-3.5 w-3.5 text-indigo-500" />
              <span>Problem Statement</span>
            </div>
            <div
              className="prose prose-xs max-w-none text-zinc-700 dark:text-zinc-300"
              dangerouslySetInnerHTML={{ __html: formatMarkdownToHtml(question.statement) }}
            />
          </div>
        )}
      </div>

      {/* Brute Force vs Optimal Solution Tabs */}
      <div className="mb-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
            {isOptimal ? <Sparkles className="h-4 w-4 text-indigo-500" /> : <Flame className="h-4 w-4 text-amber-500" />}
            <span>Solution Approaches</span>
          </div>
        </div>

        <ApproachTabs activeApproach={activeApproach} onSelect={setActiveApproach} />

        {/* Solution Explanation */}
        <div className="my-4 rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 text-xs leading-relaxed text-zinc-700 dark:border-zinc-800/80 dark:bg-zinc-950/40 dark:text-zinc-300">
          <strong className="mb-1 block font-bold text-zinc-900 dark:text-zinc-100">Algorithmic Explanation:</strong>
          {currentSolution.explanation}
        </div>

        {/* Complexity Badges */}
        <div className="mb-4 flex flex-wrap gap-4 text-xs font-medium">
          <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
            <strong className="text-zinc-900 dark:text-white">Time Complexity:</strong> {currentSolution.timeComp}
          </div>
          <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
            <strong className="text-zinc-900 dark:text-white">Space Complexity:</strong> {currentSolution.spaceComp}
          </div>
        </div>

        {/* C++ Solution CodeBox */}
        <CodeBox
          code={currentSolution.cppCode}
          filename={`${slug}_${activeApproach}.cpp`}
        />
      </div>

      {/* Prev / Next Problem Navigation Bar */}
      <div className="flex items-center justify-between">
        {prevSlug ? (
          <Link
            href={`/dsa/problem/${prevSlug}`}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-xs font-semibold text-zinc-700 shadow-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous: {prevQ?.title}</span>
          </Link>
        ) : (
          <div />
        )}

        {nextSlug ? (
          <Link
            href={`/dsa/problem/${nextSlug}`}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-xs font-semibold text-zinc-700 shadow-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
          >
            <span>Next: {nextQ?.title}</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </main>
  );
}
