'use server';

import { SqlService } from '../services/sql.service';
import { SqlTopic, SqlQuestion } from '../models/sql.types';

export async function fetchSqlTopicsAction(): Promise<SqlTopic[]> {
  return await SqlService.getTopics();
}

export async function fetchSqlQuestionBySlugAction(slug: string): Promise<SqlQuestion | null> {
  return await SqlService.getQuestionBySlug(slug);
}
