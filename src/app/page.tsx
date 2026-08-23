import React from 'react';
import { DsaService } from '@/lib/services/dsa.service';
import { Sidebar } from '@/components/shared/Sidebar';
import { PatternCard } from '@/components/dsa/PatternCard';
import { Layers, HelpCircle } from 'lucide-react';

export const revalidate = 3600; // Static site generation with 1-hour ISR revalidation

export default async function DashboardPage() {
  const patterns = await DsaService.getPatterns();
  const totalQuestions = patterns.reduce((sum, p) => sum + p.questions.length, 0);

  return (
    <div className="flex">
      <Sidebar patterns={patterns} />

      <main className="flex-1 lg:pl-64">
        <div className="mx-auto max-w-7xl px-6 py-8">
          {/* Hero Banner */}
          <div className="mb-8 overflow-hidden rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/60 p-8 shadow-sm dark:border-indigo-900/40 dark:from-indigo-950/40 dark:via-zinc-900 dark:to-purple-950/30 dark:shadow-none">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="mb-2 text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                  DSA Pattern Recognition Bible
                </h1>
                <p className="max-w-2xl text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-sm">
                  Master 19 core algorithmic patterns, uniform sub-pattern blueprints, and curated LeetCode C++ solutions for rapid SDE placement prep.
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-3 rounded-full border border-indigo-200 bg-white/80 px-4 py-2 text-xs font-semibold text-indigo-600 shadow-sm dark:border-indigo-900/60 dark:bg-indigo-950/60 dark:text-indigo-300">
                <span className="flex items-center gap-1.5">
                  <Layers className="h-4 w-4 text-indigo-500" />
                  <span>{patterns.length} Patterns</span>
                </span>
                <span className="text-zinc-300 dark:text-zinc-700">•</span>
                <span className="flex items-center gap-1.5">
                  <HelpCircle className="h-4 w-4 text-indigo-500" />
                  <span>{totalQuestions} Questions</span>
                </span>
              </div>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            <Layers className="h-3.5 w-3.5" />
            <span>Pattern Overview</span>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {patterns.map((pattern) => (
              <PatternCard key={pattern.id} pattern={pattern} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
