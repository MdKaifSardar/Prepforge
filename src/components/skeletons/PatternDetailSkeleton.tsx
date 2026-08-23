import React from 'react';

export function PatternDetailSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      {/* Breadcrumb Skeleton */}
      <div className="mb-6 flex items-center gap-2">
        <div className="h-6 w-20 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800/80" />
        <div className="h-4 w-4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800/60" />
        <div className="h-4 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800/60" />
        <div className="h-4 w-4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800/60" />
        <div className="h-4 w-36 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800/80" />
      </div>

      {/* Main Pattern Header Card Skeleton */}
      <div className="mb-8 rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
        <div className="border-b border-zinc-100 p-6 dark:border-zinc-800/80">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-7 w-7 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800/80" />
            <div className="h-8 w-64 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800/80" />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-6 w-28 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800/60" />
            ))}
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <div className="mb-2 h-4 w-48 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800/80" />
            <div className="h-16 w-full animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800/40" />
          </div>

          <div>
            <div className="mb-2 h-4 w-36 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800/80" />
            <div className="h-16 w-full animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800/40" />
          </div>

          <div>
            <div className="mb-2 h-4 w-56 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800/80" />
            <div className="h-40 w-full animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800/40" />
          </div>
        </div>
      </div>

      {/* Sub-Pattern Cards Grid Skeleton */}
      <div className="mb-8 rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
        <div className="mb-4 flex items-center justify-between">
          <div className="h-4 w-40 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800/80" />
          <div className="h-5 w-24 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800/80" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-28 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="h-5 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800/80 mb-2" />
              <div className="h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-800/60" />
            </div>
          ))}
        </div>
      </div>

      {/* Questions Section Skeleton */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-5 w-56 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800/80" />
          <div className="h-5 w-24 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800/80" />
        </div>
        <div className="h-20 w-full animate-pulse rounded-2xl bg-zinc-200 dark:bg-zinc-800/40" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/60">
              <div className="h-5 w-40 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800/80" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
