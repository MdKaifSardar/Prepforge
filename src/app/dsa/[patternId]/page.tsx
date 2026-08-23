import React from 'react';
import { notFound } from 'next/navigation';
import { DsaService } from '@/lib/services/dsa.service';
import { PatternDetailView } from '@/components/dsa/PatternDetailView';

interface PageProps {
  params: Promise<{ patternId: string }>;
}

export default async function MainPatternPage({ params }: PageProps) {
  const { patternId } = await params;
  const pattern = await DsaService.getPatternById(patternId);

  if (!pattern) {
    notFound();
  }

  return <PatternDetailView pattern={pattern} />;
}
