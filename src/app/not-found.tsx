import Link from 'next/link';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-6 py-12 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400">
        <AlertCircle className="h-8 w-8" />
      </div>

      <h1 className="mb-2 text-2xl font-extrabold text-zinc-900 dark:text-white sm:text-3xl">
        Page Not Found
      </h1>

      <p className="mb-6 max-w-md text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-sm">
        The DSA pattern, sub-pattern blueprint, or problem solution you are looking for does not exist or has been moved.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Return to Patterns Dashboard</span>
      </Link>
    </main>
  );
}
