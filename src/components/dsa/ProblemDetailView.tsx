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

  const patternSlug = pattern.slug || String(pattern.id);
  const questionSlug = question.slug || question.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  const currentSolution = activeApproach === 'optimal' ? question.optimal : question.bruteForce;
  const isOptimal = activeApproach === 'optimal';

  const prevSlug = prevQ ? (prevQ.slug || prevQ.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')) : undefined;
  const nextSlug = nextQ ? (nextQ.slug || nextQ.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')) : undefined;

  const diffBadgeClasses = {
    easy: 'border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-400',
    medium: 'border-amber-200 bg-amber-50 text-amber-600 dark:border-amber-900/40 dark:bg-amber-950/40 dark:text-amber-400',
    hard: 'border-red-200 bg-red-50 text-red-600 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-400',
  }[question.diff];

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        backHref={`/dsa/${patternSlug}`}
        backLabel={`Back to ${pattern.name}`}
        items={[
          { label: 'DSA Patterns', href: '/' },
          { label: pattern.name, href: `/dsa/${patternSlug}` },
          { label: question.title, href: `/dsa/problem/${patternSlug}/${questionSlug}` },
        ]}
      />

      {/* Title Header Card */}
      <div className="mb-8 overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <FileCode className="h-6 w-6" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400">
                  {question.lcNum}
                </span>
                <h1 className="text-xl font-extrabold text-zinc-900 dark:text-white sm:text-2xl">
                  {question.title}
                </h1>
                <span className={`rounded-full border px-2.5 py-0.5 text-xs font-bold capitalize ${diffBadgeClasses}`}>
                  {question.diff}
                </span>
              </div>

              <div className="mt-2 flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                <span>Pattern #{String(pattern.displayOrder || pattern.id).padStart(2, '0')}: {pattern.name}</span>
                <span>•</span>
                <span>Problem {index} of {total}</span>
              </div>
            </div>
          </div>

          <a
            href={question.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-xs font-bold text-zinc-700 shadow-sm transition-all hover:bg-zinc-100 hover:text-indigo-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-indigo-400"
          >
            <span>View on LeetCode</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Problem Description & Overview */}
        {(question.detailedDescription || question.statement) && (
          <div className="mt-6 border-t border-zinc-100 pt-6 dark:border-zinc-800">
            <h2 className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Problem Description
            </h2>
            <div
              className="prose prose-xs max-w-none text-zinc-700 leading-relaxed dark:text-zinc-300"
              dangerouslySetInnerHTML={{
                __html: formatMarkdownToHtml(question.detailedDescription || question.statement || '')
              }}
            />
          </div>
        )}

        {/* Structured Examples Cards */}
        {question.examples && question.examples.length > 0 && (
          <div className="mt-6 border-t border-zinc-100 pt-6 dark:border-zinc-800">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Example Test Cases & Explanations
            </h3>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
              {question.examples.map((ex, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-zinc-200 bg-zinc-50/80 p-4 font-mono text-xs leading-relaxed text-zinc-800 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/80 dark:text-zinc-200"
                >
                  <div className="mb-1.5 flex items-center justify-between font-sans text-[11px] font-bold text-zinc-400 dark:text-zinc-500">
                    <span>Example #{idx + 1}</span>
                  </div>
                  <div className="my-1.5">
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">Input: </span>
                    <span className="font-mono text-zinc-900 dark:text-zinc-100">{ex.input}</span>
                  </div>
                  <div className="my-1.5">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">Output: </span>
                    <span className="font-mono text-zinc-900 dark:text-zinc-100">{ex.output}</span>
                  </div>
                  {ex.explanation && (
                    <div className="mt-2.5 border-t border-zinc-200/60 pt-2 font-sans text-[11.5px] text-zinc-600 dark:border-zinc-800/80 dark:text-zinc-400">
                      <strong className="text-zinc-800 dark:text-zinc-300">Explanation: </strong>
                      {ex.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Solution Section */}
      <div className="mb-8">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-base font-bold text-zinc-900 dark:text-white sm:text-lg">
            C++ Solutions & Approaches
          </h2>
          <ApproachTabs activeApproach={activeApproach} onSelect={setActiveApproach} />
        </div>

        {/* Complexity & Explanation Banner */}
        <div className={`mb-6 overflow-hidden rounded-2xl border p-4 sm:p-5 transition-all ${
          isOptimal
            ? 'border-indigo-200 bg-indigo-50/50 dark:border-indigo-900/40 dark:bg-indigo-950/30'
            : 'border-amber-200 bg-amber-50/50 dark:border-amber-900/40 dark:bg-amber-950/30'
        }`}>
          <div className="mb-3 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              {isOptimal ? (
                <Sparkles className="h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400 sm:h-5 sm:w-5" />
              ) : (
                <Flame className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400 sm:h-5 sm:w-5" />
              )}
              <span className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-white">
                {isOptimal ? 'Optimal Approach' : 'Brute Force Approach'}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold sm:gap-3">
              <span className="rounded-lg bg-white/80 px-2.5 py-1 text-zinc-700 shadow-sm whitespace-nowrap dark:bg-zinc-900 dark:text-zinc-300">
                Time: <strong className="text-indigo-600 dark:text-indigo-400">{currentSolution.timeComp}</strong>
              </span>
              <span className="rounded-lg bg-white/80 px-2.5 py-1 text-zinc-700 shadow-sm whitespace-nowrap dark:bg-zinc-900 dark:text-zinc-300">
                Space: <strong className="text-indigo-600 dark:text-indigo-400">{currentSolution.spaceComp}</strong>
              </span>
            </div>
          </div>

          <div
            className="prose prose-xs max-w-none text-zinc-700 dark:text-zinc-300"
            dangerouslySetInnerHTML={{ __html: formatMarkdownToHtml(currentSolution.explanation) }}
          />
        </div>

        {/* C++ Solution CodeBox */}
        <CodeBox
          code={currentSolution.cppCode}
          filename={`${questionSlug}_${activeApproach}.cpp`}
        />
      </div>

      {/* Prev / Next Problem Navigation Bar */}
      <div className="flex items-center justify-between">
        {prevSlug ? (
          <Link
            href={`/dsa/problem/${patternSlug}/${prevSlug}`}
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
            href={`/dsa/problem/${patternSlug}/${nextSlug}`}
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
