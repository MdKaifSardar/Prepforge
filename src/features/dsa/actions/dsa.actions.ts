'use server';

import { DsaService } from '../services/dsa.service';
import { Pattern, SubPattern, Question } from '../models/dsa.types';

export async function fetchAllPatternsAction(): Promise<Pattern[]> {
  return await DsaService.getPatterns();
}

export async function fetchPatternByIdAction(patternId: number | string): Promise<Pattern | null> {
  return await DsaService.getPatternById(patternId);
}

export async function fetchSubPatternAction(patternId: number | string, subId: string): Promise<{ pattern: Pattern; subPattern: SubPattern; questions: Question[] } | null> {
  return await DsaService.getSubPattern(patternId, subId);
}

export async function fetchQuestionBySlugAction(slug: string) {
  return await DsaService.getQuestionBySlug(slug);
}
