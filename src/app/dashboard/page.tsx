import React from 'react';
import { ProfileDashboardView } from '@/features/auth/components/ProfileDashboardView';

export const metadata = {
  title: 'Personal Dashboard | Prepforge',
  description: 'View your account details, learning progress, and saved bookmarks.',
};

export default function DashboardPage() {
  return <ProfileDashboardView />;
}
