'use server';

import { AdminService } from '../services/admin.service';
import { BaseQuestion, BaseTopic } from '@/core/models/domain.types';

export async function saveTopicAction(topic: BaseTopic): Promise<void> {
  return await AdminService.saveTopic(topic);
}

export async function saveQuestionAction(question: BaseQuestion): Promise<void> {
  return await AdminService.saveQuestion(question);
}

export async function deleteQuestionAction(questionId: string): Promise<void> {
  return await AdminService.deleteQuestion(questionId);
}
