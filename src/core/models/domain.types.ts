export type DomainId = 'dsa' | 'sql' | 'dbms' | 'system-design';

export interface Domain {
  id: DomainId;
  name: string;
  description: string;
  icon: string;
  order: number;
  isPublished: boolean;
}

export interface BaseQuestion {
  id: string;             // Slug or unique key (e.g. "two-sum" or "second-highest-salary")
  domainId: DomainId;     // 'dsa' | 'sql' | 'dbms'
  title: string;
  diff: 'easy' | 'medium' | 'hard';
  topicId: string | number; // Pattern ID (DSA) or Topic ID (SQL/DBMS)
  subTopicId?: string;
  tags?: string[];
  isPublished?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface BaseTopic {
  id: string | number;
  domainId: DomainId;
  name: string;
  cues: string[];
  thinkAbout?: string;
  coreIdea?: string;
  templateCode?: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  pitfalls?: string[];
  isPublished?: boolean;
  questionCount?: number;
}

export interface BaseSubTopic {
  id: string;
  topicId: string | number;
  name: string;
  cues: string[];
  thinkAbout?: string;
  coreIdea?: string;
  templateCode?: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  pitfalls?: string[];
}
