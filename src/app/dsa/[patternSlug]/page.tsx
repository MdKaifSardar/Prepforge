import React from 'react';
import { notFound } from 'next/navigation';
import { PatternDetailView } from '@/components/dsa/PatternDetailView';
import { DsaService } from '@/features/dsa/services/dsa.service';

export async function generateMetadata({ params }: { params: Promise<{ patternSlug: string }> }) {
  const { patternSlug } = await params;
  const pattern = await DsaService.getPatternBySlug(patternSlug);
  if (!pattern) return { title: 'Pattern Not Found | Prepforge' };

  return {
    title: `${pattern.name} | Prepforge`,
    description: pattern.coreIdea || `Master ${pattern.name} algorithmic pattern for technical coding interviews.`,
  };
}

export default async function PatternPage({ params }: { params: Promise<{ patternSlug: string }> }) {
  const { patternSlug } = await params;
  const pattern = await DsaService.getPatternBySlug(patternSlug);

  if (!pattern) {
    notFound();
  }

  return <PatternDetailView pattern={pattern} />;
}
