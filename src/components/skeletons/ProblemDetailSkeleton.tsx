import React from 'react';

export function ProblemDetailSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      {/* Breadcrumb Skeleton */}
      <div className="mb-6 flex items-center gap-2">
        <div className="h-6 w-28 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800/80" />
        <div className="h-4 w-4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800/60" />
        <div className="h-4 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800/60" />
        <div className="h-4 w-4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800/60" />
        <div className="h-4 w-36 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800/80" />
      </div>

      {/* Problem Header Card Skeleton */}
      <div className="mb-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-4 w-12 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800/80" />
              <div className="h-5 w-16 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800/80" />
              <div className="h-4 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800/60" />
            </div>
            <div className="h-8 w-64 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800/80" />
          </div>
          <div className="h-10 w-36 shrink-0 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800/80" />
        </div>

        {/* Problem Statement Box Skeleton */}
        <div className="mt-6 border-t border-zinc-100 pt-6 dark:border-zinc-800/80">
          <div className="mb-2 h-4 w-36 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800/80" />
          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-800/40" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800/40" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800/40" />
          </div>
        </div>
      </div>

      {/* Solution Section Skeleton */}
      <div className="mb-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
        <div className="mb-4 h-4 w-40 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800/80" />

        {/* Tabs Bar Skeleton */}
        <div className="mb-4 flex items-center gap-3 border-b border-zinc-200 pb-3 dark:border-zinc-800">
          <div className="h-8 w-44 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800/80" />
          <div className="h-8 w-56 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800/80" />
        </div>

        {/* Explanation Box Skeleton */}
        <div className="my-4 h-20 w-full animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800/40" />

        {/* Complexity Badges Skeleton */}
        <div className="mb-4 flex gap-4">
          <div className="h-8 w-36 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800/60" />
          <div className="h-8 w-36 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800/60" />
        </div>

        {/* VSCode CodeBox Skeleton */}
        <div className="h-56 w-full animate-pulse rounded-xl border border-zinc-800 bg-zinc-950 p-4" />
      </div>

      {/* Prev / Next Navigation Buttons Skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-10 w-44 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800/80" />
        <div className="h-10 w-44 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800/80" />
      </div>
    </div>
  );
}
