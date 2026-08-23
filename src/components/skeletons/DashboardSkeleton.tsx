import React from 'react';

export function DashboardSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      {/* Hero Banner Skeleton */}
      <div className="mb-8 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/60">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <div className="h-8 w-72 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800/80" />
            <div className="h-4 w-96 max-w-full animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800/60" />
            <div className="h-4 w-80 max-w-full animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800/60" />
          </div>
          <div className="h-9 w-48 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800/80" />
        </div>
      </div>

      {/* Section Label Skeleton */}
      <div className="mb-4 flex items-center gap-2">
        <div className="h-4 w-4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800/80" />
        <div className="h-4 w-36 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800/80" />
      </div>

      {/* 9 Pattern Cards Grid Skeleton */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60"
          >
            <div>
              <div className="mb-3 flex items-center justify-between">
                <div className="h-4 w-8 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800/80" />
                <div className="h-5 w-24 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800/80" />
              </div>
              <div className="mb-2 h-6 w-48 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800/80" />
              <div className="h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-800/60" />
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-800/60">
              <div className="h-4 w-20 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800/60" />
              <div className="h-4 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800/60" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
