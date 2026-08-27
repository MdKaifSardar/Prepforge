'use client';

import React from 'react';
import { User, Bookmark, CheckCircle2, Settings, ChevronLeft, ChevronRight, LayoutDashboard } from 'lucide-react';

export type DashboardTab = 'overview' | 'bookmarks' | 'progress' | 'settings';

interface DashboardSidebarProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  isOpen?: boolean;
  onToggle?: () => void;
  onClose?: () => void;
}

export function DashboardSidebar({
  activeTab,
  onTabChange,
  isOpen = true,
  onToggle,
  onClose,
}: DashboardSidebarProps) {
  const handleItemClick = (tab: DashboardTab) => {
    onTabChange(tab);
    // Only close drawer on mobile viewports (<1024px)
    if (typeof window !== 'undefined' && window.innerWidth < 1024 && onClose) {
      onClose();
    }
  };

  const navItems = [
    {
      id: 'overview' as DashboardTab,
      label: 'Overview & Profile',
      icon: User,
      description: 'Account info & member details',
    },
    {
      id: 'bookmarks' as DashboardTab,
      label: 'Bookmarked Questions',
      icon: Bookmark,
      description: 'Saved problem blueprints',
    },
    {
      id: 'progress' as DashboardTab,
      label: 'Solved Progress',
      icon: CheckCircle2,
      description: 'Completed interview questions',
    },
    {
      id: 'settings' as DashboardTab,
      label: 'Account Settings',
      icon: Settings,
      description: 'Security & preferences',
    },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-zinc-950/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Floating Side-Edge Open Trigger Button (Shown ONLY when Sidebar is Collapsed) */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed left-0 top-20 z-40 flex h-8 w-7 items-center justify-center rounded-r-lg border border-l-0 border-zinc-200 bg-white/90 shadow-md backdrop-blur-md transition-all hover:bg-indigo-50 sm:h-10 sm:w-9 sm:rounded-r-xl dark:border-zinc-800 dark:bg-zinc-900/90 dark:hover:bg-indigo-950/50 text-zinc-700 dark:text-zinc-300 group"
          title="Expand Account Control Menu"
          aria-label="Expand Account Control Menu"
        >
          <ChevronRight className="h-4 w-4 text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform sm:h-5 sm:w-5" />
        </button>
      )}

      {/* Sidebar Navigation Drawer */}
      <aside
        className={`fixed left-0 top-16 bottom-0 z-40 w-72 border-r border-zinc-200 bg-white/95 backdrop-blur-md p-4 transition-transform duration-300 ease-in-out dark:border-zinc-800/80 dark:bg-zinc-950/95 overflow-y-auto ${
          isOpen ? 'translate-x-0 shadow-2xl lg:shadow-none' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header & Close Button */}
        <div className="mb-4 flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800/80">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
            <LayoutDashboard className="h-4 w-4 text-indigo-500" />
            <span>Account Controls</span>
          </div>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900 transition-colors"
            title="Collapse Menu"
            aria-label="Collapse Menu"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isSelected = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-start gap-3 rounded-xl p-3 text-left transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 dark:bg-indigo-600'
                    : 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900'
                }`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                    isSelected
                      ? 'bg-indigo-700 text-white'
                      : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="truncate">
                  <span className="block text-xs font-bold tracking-tight">
                    {item.label}
                  </span>
                  <span
                    className={`block text-[11px] truncate ${
                      isSelected ? 'text-indigo-200' : 'text-zinc-400 dark:text-zinc-500'
                    }`}
                  >
                    {item.description}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
