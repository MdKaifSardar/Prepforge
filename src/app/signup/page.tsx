import React, { Suspense } from 'react';
import { SignupForm } from '@/features/auth/components/SignupForm';

export const metadata = {
  title: 'Sign Up | Prepforge',
  description: 'Create an account to master software engineering patterns and technical interview blueprints.',
};

export default function SignupPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-6">
      <Suspense fallback={<div className="h-96 w-96 animate-pulse rounded-3xl bg-zinc-200 dark:bg-zinc-800" />}>
        <SignupForm />
      </Suspense>
    </main>
  );
}
