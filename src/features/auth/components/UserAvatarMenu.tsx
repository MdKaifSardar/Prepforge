'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, LayoutDashboard, ShieldCheck, ChevronDown, Sparkles } from 'lucide-react';

export function UserAvatarMenu() {
  const { user, userProfile, logout, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (loading) {
    return <div className="h-9 w-9 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />;
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/login"
          className="rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 transition-all hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          Sign In
        </Link>
        <Link
          href="/signup"
          className="rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  const displayName = userProfile?.displayName || user.displayName || user.email?.split('@')[0] || 'Member';
  const role = userProfile?.role || 'user';
  const isAdmin = role === 'admin';
  const photoURL = userProfile?.photoURL || user.photoURL;

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
    router.push('/login');
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white p-1 pr-2.5 transition-all hover:border-indigo-500/50 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
      >
        {photoURL ? (
          <img src={photoURL} alt={displayName} className="h-7 w-7 rounded-full object-cover" />
        ) : (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-[11px] font-bold text-white">
            {displayName.charAt(0).toUpperCase()}
          </div>
        )}

        <span className="hidden max-w-[100px] truncate text-xs font-bold text-zinc-800 dark:text-zinc-200 sm:inline-block">
          {displayName}
        </span>

        {isAdmin && (
          <span className="rounded-full bg-purple-100 px-1.5 py-0.5 text-[9px] font-extrabold text-purple-600 dark:bg-purple-950/80 dark:text-purple-400">
            ADMIN
          </span>
        )}

        <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-1.5 shadow-2xl backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900">
          <div className="border-b border-zinc-100 px-3 py-2.5 dark:border-zinc-800">
            <p className="truncate text-xs font-bold text-zinc-900 dark:text-white">{displayName}</p>
            <p className="truncate text-[11px] text-zinc-500 dark:text-zinc-400">{user.email}</p>
          </div>

          <div className="py-1">
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-700 transition-colors hover:bg-indigo-50 hover:text-indigo-600 dark:text-zinc-300 dark:hover:bg-indigo-950/50 dark:hover:text-indigo-400"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Personal Dashboard</span>
            </Link>

            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-purple-600 transition-colors hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-950/50"
              >
                <ShieldCheck className="h-4 w-4" />
                <span>Admin Panel</span>
              </Link>
            )}
          </div>

          <div className="border-t border-zinc-100 pt-1 dark:border-zinc-800">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
