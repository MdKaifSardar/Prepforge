'use server';

import { DbmsService } from '../services/dbms.service';
import { DbmsTopic, DbmsQuestion } from '../models/dbms.types';

export async function fetchDbmsTopicsAction(): Promise<DbmsTopic[]> {
  return await DbmsService.getTopics();
}

export async function fetchDbmsQuestionBySlugAction(slug: string): Promise<DbmsQuestion | null> {
  return await DbmsService.getQuestionBySlug(slug);
}
