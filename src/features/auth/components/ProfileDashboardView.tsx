'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { User, Mail, ShieldCheck, Calendar, Key, Bookmark, CheckCircle2, Layers, ArrowRight } from 'lucide-react';

export function ProfileDashboardView() {
  const { user, userProfile, loading } = useAuth();

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="h-48 w-full animate-pulse rounded-3xl bg-zinc-200 dark:bg-zinc-800" />
      </main>
    );
  }

  const displayName = userProfile?.displayName || user?.displayName || user?.email?.split('@')[0] || 'Member';
  const email = userProfile?.email || user?.email || 'N/A';
  const role = userProfile?.role || 'user';
  const provider = userProfile?.providerId === 'google.com' ? 'Google OAuth' : 'Email & Password';
  const createdAt = userProfile?.createdAt ? new Date(userProfile.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recently Joined';
  const photoURL = userProfile?.photoURL || user?.photoURL;

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      {/* Hero Welcome Banner */}
      <div className="mb-8 overflow-hidden rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/60 p-8 shadow-sm dark:border-indigo-900/40 dark:from-indigo-950/40 dark:via-zinc-900 dark:to-purple-950/30">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            {photoURL ? (
              <img src={photoURL} alt={displayName} className="h-16 w-16 rounded-full border-2 border-indigo-500/30 object-cover shadow-lg" />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-2xl font-extrabold text-white shadow-lg">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                  Welcome back, {displayName}!
                </h1>
                <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-600 dark:border-indigo-900/50 dark:bg-indigo-950/50 dark:text-indigo-400">
                  {role.toUpperCase()}
                </span>
              </div>
              <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                Track your pattern practice, saved bookmarks, and technical interview readiness.
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
          >
            <Layers className="h-4 w-4" />
            <span>Explore DSA Patterns</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Account Overview Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Personal Details Card */}
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 md:col-span-2">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Account & Profile Info
          </h2>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800">
              <div className="flex items-center gap-2.5 text-zinc-500 dark:text-zinc-400">
                <User className="h-4 w-4 text-indigo-500" />
                <span>Full Name</span>
              </div>
              <span className="font-bold text-zinc-900 dark:text-white">{displayName}</span>
            </div>

            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800">
              <div className="flex items-center gap-2.5 text-zinc-500 dark:text-zinc-400">
                <Mail className="h-4 w-4 text-indigo-500" />
                <span>Email Address</span>
              </div>
              <span className="font-bold text-zinc-900 dark:text-white">{email}</span>
            </div>

            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800">
              <div className="flex items-center gap-2.5 text-zinc-500 dark:text-zinc-400">
                <Key className="h-4 w-4 text-indigo-500" />
                <span>Authentication Method</span>
              </div>
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">{provider}</span>
            </div>

            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800">
              <div className="flex items-center gap-2.5 text-zinc-500 dark:text-zinc-400">
                <Calendar className="h-4 w-4 text-indigo-500" />
                <span>Member Since</span>
              </div>
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">{createdAt}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-zinc-500 dark:text-zinc-400">
                <ShieldCheck className="h-4 w-4 text-indigo-500" />
                <span>Account Access Level</span>
              </div>
              <span className="rounded-md bg-zinc-100 px-2 py-0.5 font-mono text-[11px] font-bold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                {role}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats Widget */}
        <div className="flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
          <div>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Prep Progress
            </h2>

            <div className="space-y-3">
              <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-3 dark:border-zinc-800/60 dark:bg-zinc-950/40">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Solved Problems</span>
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </div>
                <p className="mt-2 text-xl font-extrabold text-zinc-900 dark:text-white">0 / 23</p>
              </div>

              <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-3 dark:border-zinc-800/60 dark:bg-zinc-950/40">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Bookmarked Questions</span>
                  <Bookmark className="h-4 w-4 text-amber-500" />
                </div>
                <p className="mt-2 text-xl font-extrabold text-zinc-900 dark:text-white">0 Saved</p>
              </div>
            </div>
          </div>

          <p className="mt-6 text-[11px] text-zinc-400 dark:text-zinc-500">
            Session active via 14-day secure HTTP-Only cookie.
          </p>
        </div>
      </div>
    </main>
  );
}
