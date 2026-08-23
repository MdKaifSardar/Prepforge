import { BaseQuestion, BaseTopic, BaseSubTopic } from '@/core/models/domain.types';

export interface DbmsQuestion extends Omit<BaseQuestion, 'domainId'> {
  domainId: 'dbms';
  questionType: 'conceptual' | 'mcq' | 'case-study';
  options?: string[];
  correctOptionIndex?: number;
  detailedAnswer: string;
  diagramUrl?: string;
}

export interface DbmsSubTopic extends Omit<BaseSubTopic, 'topicId'> {
  topicId: string;
}

export interface DbmsTopic extends Omit<BaseTopic, 'domainId'> {
  domainId: 'dbms';
  subTopics?: DbmsSubTopic[];
  questions?: DbmsQuestion[];
}
