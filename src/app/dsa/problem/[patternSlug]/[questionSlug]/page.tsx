import React from 'react';
import { notFound } from 'next/navigation';
import { ProblemDetailView } from '@/components/dsa/ProblemDetailView';
import { DsaService } from '@/features/dsa/services/dsa.service';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ patternSlug: string; questionSlug: string }>;
}) {
  const { patternSlug, questionSlug } = await params;
  const res = await DsaService.getQuestionByCompositeSlug(patternSlug, questionSlug);
  if (!res) return { title: 'Problem Not Found | Prepforge' };

  return {
    title: `${res.question.lcNum}: ${res.question.title} - C++ Solution | Prepforge`,
    description: `Optimal & Brute Force C++ solutions for ${res.question.title}. Pattern #${String(res.pattern.displayOrder || res.pattern.id).padStart(2, '0')} (${res.pattern.name}).`,
  };
}

export default async function QuestionPage({
  params,
}: {
  params: Promise<{ patternSlug: string; questionSlug: string }>;
}) {
  const { patternSlug, questionSlug } = await params;
  const res = await DsaService.getQuestionByCompositeSlug(patternSlug, questionSlug);

  if (!res) {
    notFound();
  }

  return (
    <ProblemDetailView
      question={res.question}
      pattern={res.pattern}
      index={res.index}
      total={res.total}
      prevQ={res.prevQ}
      nextQ={res.nextQ}
    />
  );
}
