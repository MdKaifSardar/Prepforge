'use client';

import React, { useState } from 'react';
import { Pattern } from '@/lib/models/dsa.types';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { SubPatternGrid } from '@/components/dsa/SubPatternGrid';
import { FilterToolbar } from '@/components/dsa/FilterToolbar';
import { ProblemCard } from '@/components/dsa/ProblemCard';
import { CodeBox } from '@/components/dsa/CodeBox';
import { Layers, Code2, AlertTriangle, Lightbulb, Zap, HelpCircle } from 'lucide-react';

interface PatternDetailViewProps {
  pattern: Pattern;
}

export function PatternDetailView({ pattern }: PatternDetailViewProps) {
  const [activeSubId, setActiveSubId] = useState<string>('all');
  const [activeDiff, setActiveDiff] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');

  const numStr = String(pattern.id).padStart(2, '0');
  const subMap = new Map<string, string>();
  if (pattern.subPatterns) {
    pattern.subPatterns.forEach(sp => subMap.set(sp.id, sp.name));
  }

  const filteredQuestions = pattern.questions.filter(q => {
    const matchesSub = activeSubId === 'all' || q.subPatternId === activeSubId;
    const matchesDiff = activeDiff === 'all' || q.diff === activeDiff;
    return matchesSub && matchesDiff;
  });

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        backHref="/"
        backLabel="Dashboard"
        items={[
          { label: 'Patterns', href: '/' },
          { label: pattern.name },
        ]}
      />

      {/* Pattern Main Header Card */}
      <div className="mb-8 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
        <div className="border-b border-zinc-100 p-6 dark:border-zinc-800/80">
          <div className="mb-3 flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 font-mono text-xs font-bold text-white shadow-sm">
              #{numStr}
            </span>
            <h1 className="text-xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-2xl">
              {pattern.name}
            </h1>
          </div>

          {/* Recognition Cues */}
          <div className="mt-4">
            <div className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              <Zap className="h-3.5 w-3.5 text-amber-500" />
              <span>Recognition Cues</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {pattern.cues.map((cue, idx) => (
                <span
                  key={idx}
                  className="rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                >
                  {cue}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Pattern Details Body */}
        <div className="p-6 space-y-6">
          {/* When to Think About */}
          <div>
            <div className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              <Lightbulb className="h-3.5 w-3.5 text-indigo-500" />
              <span>When To Think About This Pattern</span>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 text-xs leading-relaxed text-zinc-700 dark:border-zinc-800/80 dark:bg-zinc-950/40 dark:text-zinc-300">
              {pattern.thinkAbout}
            </div>
          </div>

          {/* Core Idea */}
          <div>
            <div className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              <Layers className="h-3.5 w-3.5 text-indigo-500" />
              <span>Core Idea & Logic</span>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 text-xs leading-relaxed text-zinc-700 dark:border-zinc-800/80 dark:bg-zinc-950/40 dark:text-zinc-300">
              {pattern.coreIdea}
            </div>
          </div>

          {/* Master C++ Template */}
          <div>
            <div className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              <Code2 className="h-3.5 w-3.5 text-indigo-500" />
              <span>Generic C++ Master Template</span>
            </div>
            <CodeBox code={pattern.templateCode} filename="master_template.cpp" />
          </div>

          {/* Complexity & Pitfalls Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 text-xs dark:border-zinc-800/80 dark:bg-zinc-950/40">
              <span className="mb-2 block font-bold text-zinc-900 dark:text-zinc-100">Complexity Notes</span>
              <ul className="space-y-1 text-zinc-600 dark:text-zinc-400">
                <li><strong className="text-zinc-800 dark:text-zinc-200">Time:</strong> {pattern.timeComplexity}</li>
                <li><strong className="text-zinc-800 dark:text-zinc-200">Space:</strong> {pattern.spaceComplexity}</li>
              </ul>
            </div>

            <div className="rounded-xl border border-red-200/60 bg-red-50/30 p-4 text-xs dark:border-red-900/30 dark:bg-red-950/20">
              <div className="mb-2 flex items-center gap-1.5 font-bold text-red-600 dark:text-red-400">
                <AlertTriangle className="h-3.5 w-3.5" />
                <span>Common Interview Mistakes</span>
              </div>
              <ul className="list-disc space-y-1 pl-4 text-zinc-600 dark:text-zinc-400">
                {pattern.pitfalls.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Pattern Blueprint Cards Grid */}
      <SubPatternGrid
        patternId={pattern.id}
        subPatterns={pattern.subPatterns || []}
        questions={pattern.questions}
      />

      {/* Quick Access — All Questions Section */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
            <HelpCircle className="h-4 w-4 text-indigo-500" />
            <span>Quick Access — All Pattern Questions</span>
          </div>
          <span className="rounded-full border border-zinc-200 bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            {filteredQuestions.length} Questions
          </span>
        </div>

        {/* Filter Toolbar */}
        <FilterToolbar
          subPatterns={pattern.subPatterns}
          activeSubPatternId={activeSubId}
          onSelectSubPattern={setActiveSubId}
          activeDiff={activeDiff}
          onSelectDiff={setActiveDiff}
        />

        {/* Question Cards Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {filteredQuestions.map((q) => (
            <ProblemCard
              key={q.lcNum}
              question={q}
              subPatternName={q.subPatternId ? subMap.get(q.subPatternId) : undefined}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
