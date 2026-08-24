import React from 'react';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { ProblemCard } from '@/components/dsa/ProblemCard';
import { CodeBox } from '@/components/dsa/CodeBox';
import { DsaService } from '@/features/dsa/services/dsa.service';
import { Layers, Lightbulb, Code2, AlertTriangle, HelpCircle } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ patternSlug: string; subPatternSlug: string }>;
}) {
  const { patternSlug, subPatternSlug } = await params;
  const res = await DsaService.getSubPatternBySlug(patternSlug, subPatternSlug);
  if (!res) return { title: 'Sub-Pattern Not Found | Prepforge' };

  return {
    title: `${res.subPattern.name} - Blueprint | Prepforge`,
    description: res.subPattern.coreIdea || `Deep dive into ${res.subPattern.name} algorithmic blueprint.`,
  };
}

export default async function SubPatternPage({
  params,
}: {
  params: Promise<{ patternSlug: string; subPatternSlug: string }>;
}) {
  const { patternSlug, subPatternSlug } = await params;
  const res = await DsaService.getSubPatternBySlug(patternSlug, subPatternSlug);

  if (!res) {
    notFound();
  }

  const { pattern, subPattern, questions } = res;

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        backHref={`/dsa/${pattern.slug}`}
        backLabel={`Back to ${pattern.name}`}
        items={[
          { label: 'DSA Patterns', href: '/' },
          { label: pattern.name, href: `/dsa/${pattern.slug}` },
          { label: subPattern.name, href: `/dsa/${pattern.slug}/sub/${subPattern.slug}` },
        ]}
      />

      {/* Sub-Pattern Detail Header Card */}
      <div className="mb-8 overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-8">
        <div className="mb-4 flex items-center justify-between border-b border-zinc-100 pb-4 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Sub-Pattern Blueprint
              </span>
              <h1 className="text-xl font-extrabold text-zinc-900 dark:text-white sm:text-2xl">
                {subPattern.name}
              </h1>
            </div>
          </div>
          <span className="rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-bold text-purple-600 dark:border-purple-900/40 dark:bg-purple-950/40 dark:text-purple-400">
            {questions.length} Targeted Questions
          </span>
        </div>

        {/* Cues List */}
        {subPattern.cues && subPattern.cues.length > 0 && (
          <div className="mb-6">
            <h2 className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Recognition Cues
            </h2>
            <div className="flex flex-wrap gap-2">
              {subPattern.cues.map((cue, idx) => (
                <span
                  key={idx}
                  className="rounded-lg border border-purple-200/60 bg-purple-50/50 px-3 py-1 text-xs font-medium text-purple-700 dark:border-purple-900/40 dark:bg-purple-950/30 dark:text-purple-300"
                >
                  {cue}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Think About & Core Idea */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {subPattern.thinkAbout && (
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-4 text-xs dark:border-zinc-800 dark:bg-zinc-950/40">
              <div className="mb-2 flex items-center gap-1.5 font-bold text-zinc-900 dark:text-white">
                <Lightbulb className="h-4 w-4 text-amber-500" />
                <span>When to Use</span>
              </div>
              <p className="leading-relaxed text-zinc-600 dark:text-zinc-300">
                {subPattern.thinkAbout}
              </p>
            </div>
          )}

          {subPattern.coreIdea && (
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-4 text-xs dark:border-zinc-800 dark:bg-zinc-950/40">
              <div className="mb-2 flex items-center gap-1.5 font-bold text-zinc-900 dark:text-white">
                <Layers className="h-4 w-4 text-indigo-500" />
                <span>Core Logic</span>
              </div>
              <p className="leading-relaxed text-zinc-600 dark:text-zinc-300">
                {subPattern.coreIdea}
              </p>
            </div>
          )}
        </div>

        {/* Code Template */}
        {subPattern.templateCode && (
          <div className="mt-6">
            <div className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              <Code2 className="h-4 w-4 text-indigo-500" />
              <span>Sub-Pattern C++ Template</span>
            </div>
            <CodeBox code={subPattern.templateCode} filename={`${subPattern.slug}_template.cpp`} />
          </div>
        )}
      </div>

      {/* Questions Section */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
            <HelpCircle className="h-4 w-4 text-indigo-500" />
            <span>Targeted Practice Problems</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {questions.map((q) => (
            <ProblemCard key={q.lcNum} question={q} subPatternName={subPattern.name} />
          ))}
        </div>
      </div>
    </main>
  );
}
