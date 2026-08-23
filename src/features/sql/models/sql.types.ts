import { BaseQuestion, BaseTopic, BaseSubTopic } from '@/core/models/domain.types';

export interface SqlQuestion extends Omit<BaseQuestion, 'domainId'> {
  domainId: 'sql';
  schemaSetupDdl: string;
  insertSampleData: string;
  expectedOutput: {
    headers: string[];
    rows: (string | number)[][];
  };
  solutionSql: string;
  explanation: string;
}

export interface SqlSubTopic extends Omit<BaseSubTopic, 'topicId'> {
  topicId: string;
}

export interface SqlTopic extends Omit<BaseTopic, 'domainId'> {
  domainId: 'sql';
  sqlDialect?: 'postgresql' | 'mysql' | 'sqlite';
  subTopics?: SqlSubTopic[];
  questions?: SqlQuestion[];
}
