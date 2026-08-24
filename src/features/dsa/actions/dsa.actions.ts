'use server';

import { DsaService } from '../services/dsa.service';
import { Pattern, SubPattern, Question } from '../models/dsa.types';

export async function fetchAllPatternsAction(): Promise<Pattern[]> {
  return await DsaService.getPatterns();
}

export async function fetchPatternBySlugAction(patternSlug: string): Promise<Pattern | null> {
  return await DsaService.getPatternBySlug(patternSlug);
}

export async function fetchPatternByIdAction(patternId: number | string): Promise<Pattern | null> {
  return await DsaService.getPatternById(patternId);
}

export async function fetchSubPatternBySlugAction(patternSlug: string, subPatternSlug: string): Promise<{ pattern: Pattern; subPattern: SubPattern; questions: Question[] } | null> {
  return await DsaService.getSubPatternBySlug(patternSlug, subPatternSlug);
}

export async function fetchQuestionByCompositeSlugAction(patternSlug: string, questionSlug: string) {
  return await DsaService.getQuestionByCompositeSlug(patternSlug, questionSlug);
}

export async function fetchQuestionByIdAction(questionId: string): Promise<Question | null> {
  return await DsaService.getQuestionById(questionId);
}
