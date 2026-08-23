'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { DsaService } from '@/lib/services/dsa.service';
import { Pattern, SubPattern, Question } from '@/lib/models/dsa.types';
import { Sidebar } from '@/components/shared/Sidebar';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { ProblemCard } from '@/components/dsa/ProblemCard';
import { CodeBox } from '@/components/dsa/CodeBox';
import { Layers, Code2, AlertTriangle, Lightbulb, Zap, HelpCircle } from 'lucide-react';

export default function SubPatternDetailPage() {
  const params = useParams();
  const patternId = params?.patternId ? Number(params.patternId) : 1;
  const subId = (params?.subId as string) || '';

  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [pattern, setPattern] = useState<Pattern | null>(null);
  const [subPattern, setSubPattern] = useState<SubPattern | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const allP = await DsaService.getPatterns();
      setPatterns(allP);
      const res = await DsaService.getSubPattern(patternId, subId);
      if (res) {
        setPattern(res.pattern);
        setSubPattern(res.subPattern);
        setQuestions(res.questions);
      }
      setLoading(false);
    }
    loadData();
  }, [patternId, subId]);

  if (loading || !pattern || !subPattern) {
    return (
      <div className="flex">
        <Sidebar patterns={patterns} />
        <main className="flex-1 lg:pl-64">
          <div className="mx-auto max-w-7xl px-6 py-8">
            <div className="h-10 w-48 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </main>
      </div>
    );
  }

  const cuesList = subPattern.cues || (subPattern.cue ? [subPattern.cue] : []);

  return (
    <div className="flex">
      <Sidebar patterns={patterns} />

      <main className="flex-1 lg:pl-64">
        <div className="mx-auto max-w-7xl px-6 py-8">
          {/* Breadcrumbs */}
          <Breadcrumbs
            backHref={`/dsa/${pattern.id}`}
            backLabel={`Back to ${pattern.name}`}
            items={[
              { label: 'Patterns', href: '/' },
              { label: pattern.name, href: `/dsa/${pattern.id}` },
              { label: `Sub-Pattern: ${subPattern.name}` },
            ]}
          />

          {/* Dedicated Sub-Pattern Card (Rendering 7 Uniform Sections) */}
          <div className="mb-8 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
            {/* 1. Header & Blueprint Badge */}
            <div className="border-b border-zinc-100 p-6 dark:border-zinc-800/80">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-bold text-purple-600 dark:border-purple-900/50 dark:bg-purple-950/50 dark:text-purple-400">
                    Sub-Pattern Blueprint
                  </span>
                  <h1 className="text-xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-2xl">
                    {subPattern.name}
                  </h1>
                </div>
                <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600 dark:border-indigo-900/50 dark:bg-indigo-950/50 dark:text-indigo-400">
                  {questions.length} Curated Questions
                </span>
              </div>

              {/* 2. Recognition Cues Grid */}
              <div className="mt-4">
                <div className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  <Zap className="h-3.5 w-3.5 text-amber-500" />
                  <span>Recognition Cues</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cuesList.map((cue, idx) => (
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

            {/* Sub-Pattern Detailed Body */}
            <div className="p-6 space-y-6">
              {/* 3. When To Think About */}
              {subPattern.thinkAbout && (
                <div>
                  <div className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    <Lightbulb className="h-3.5 w-3.5 text-indigo-500" />
                    <span>When To Think About This Sub-Pattern</span>
                  </div>
                  <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 text-xs leading-relaxed text-zinc-700 dark:border-zinc-800/80 dark:bg-zinc-950/40 dark:text-zinc-300">
                    {subPattern.thinkAbout}
                  </div>
                </div>
              )}

              {/* 4. Core Idea */}
              {subPattern.coreIdea && (
                <div>
                  <div className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    <Layers className="h-3.5 w-3.5 text-indigo-500" />
                    <span>Core Idea & Algorithmic Logic</span>
                  </div>
                  <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 text-xs leading-relaxed text-zinc-700 dark:border-zinc-800/80 dark:bg-zinc-950/40 dark:text-zinc-300">
                    {subPattern.coreIdea}
                  </div>
                </div>
              )}

              {/* 5. C++ Sub-Pattern Template */}
              {subPattern.templateCode && (
                <div>
                  <div className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    <Code2 className="h-3.5 w-3.5 text-indigo-500" />
                    <span>Generic C++ Sub-Pattern Template</span>
                  </div>
                  <CodeBox code={subPattern.templateCode} filename={`${subPattern.id}_template.cpp`} />
                </div>
              )}

              {/* 6 & 7. Complexity & Pitfalls Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 text-xs dark:border-zinc-800/80 dark:bg-zinc-950/40">
                  <span className="mb-2 block font-bold text-zinc-900 dark:text-zinc-100">Complexity Notes</span>
                  <ul className="space-y-1 text-zinc-600 dark:text-zinc-400">
                    <li><strong className="text-zinc-800 dark:text-zinc-200">Time:</strong> {subPattern.timeComplexity || 'O(N)'}</li>
                    <li><strong className="text-zinc-800 dark:text-zinc-200">Space:</strong> {subPattern.spaceComplexity || 'O(1)'}</li>
                  </ul>
                </div>

                {subPattern.pitfalls && subPattern.pitfalls.length > 0 && (
                  <div className="rounded-xl border border-red-200/60 bg-red-50/30 p-4 text-xs dark:border-red-900/30 dark:bg-red-950/20">
                    <div className="mb-2 flex items-center gap-1.5 font-bold text-red-600 dark:text-red-400">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      <span>Common Interview Mistakes</span>
                    </div>
                    <ul className="list-disc space-y-1 pl-4 text-zinc-600 dark:text-zinc-400">
                      {subPattern.pitfalls.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 8. Curated Sub-Pattern Problems Grid */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                <HelpCircle className="h-4 w-4 text-indigo-500" />
                <span>Curated Problems for {subPattern.name}</span>
              </div>
              <span className="rounded-full border border-zinc-200 bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
                {questions.length} Questions
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {questions.map((q) => (
                <ProblemCard key={q.lcNum} question={q} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
