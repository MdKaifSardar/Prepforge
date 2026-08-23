import React from 'react';

export function SubPatternDetailSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      {/* Breadcrumb Skeleton */}
      <div className="mb-6 flex items-center gap-2">
        <div className="h-6 w-28 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800/80" />
        <div className="h-4 w-4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800/60" />
        <div className="h-4 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800/60" />
        <div className="h-4 w-4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800/60" />
        <div className="h-4 w-40 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800/80" />
      </div>

      {/* Sub-Pattern Detail Hero Skeleton */}
      <div className="mb-8 rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
        <div className="border-b border-zinc-100 p-6 dark:border-zinc-800/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-6 w-32 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800/80" />
              <div className="h-8 w-60 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800/80" />
            </div>
            <div className="h-6 w-36 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800/80" />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-6 w-24 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800/60" />
            ))}
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <div className="mb-2 h-4 w-52 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800/80" />
            <div className="h-16 w-full animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800/40" />
          </div>

          <div>
            <div className="mb-2 h-4 w-44 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800/80" />
            <div className="h-16 w-full animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800/40" />
          </div>

          <div>
            <div className="mb-2 h-4 w-56 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800/80" />
            <div className="h-44 w-full animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800/40" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="h-24 rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-950/40" />
            <div className="h-24 rounded-xl border border-red-200/60 bg-red-50/30 p-4 dark:border-red-900/30 dark:bg-red-950/20" />
          </div>
        </div>
      </div>

      {/* Curated Questions Skeleton */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-5 w-48 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800/80" />
          <div className="h-5 w-24 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800/80" />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/60">
              <div className="h-5 w-36 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800/80" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
