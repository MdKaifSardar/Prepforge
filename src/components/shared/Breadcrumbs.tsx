import React from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowLeft } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  backHref?: string;
  backLabel?: string;
}

export function Breadcrumbs({ items, backHref, backLabel = 'Back' }: BreadcrumbsProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
      {backHref && (
        <Link
          href={backHref}
          className="mr-2 inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>{backLabel}</span>
        </Link>
      )}

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-600" />}
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'font-semibold text-zinc-900 dark:text-zinc-100' : ''}>{item.label}</span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
