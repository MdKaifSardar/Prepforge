import React from 'react';
import { notFound } from 'next/navigation';
import { DsaService } from '@/lib/services/dsa.service';
import { ProblemDetailView } from '@/components/dsa/ProblemDetailView';

interface ProblemPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProblemDetailPage({ params }: ProblemPageProps) {
  const { slug } = await params;
  const res = await DsaService.getQuestionBySlug(slug);

  if (!res) {
    notFound();
  }

  return <ProblemDetailView {...res} />;
}
