import React, { Suspense } from 'react';
import { LoginForm } from '@/features/auth/components/LoginForm';

export const metadata = {
  title: 'Sign In | Prepforge',
  description: 'Sign in to access your interview patterns, bookmarks, and solved progress.',
};

export default function LoginPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-6">
      <Suspense fallback={<div className="h-96 w-96 animate-pulse rounded-3xl bg-zinc-200 dark:bg-zinc-800" />}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
