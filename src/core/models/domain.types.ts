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
  id: string;               // Immutable primary ID (e.g., "q_two_sum")
  slug: string;             // SEO-friendly slug (e.g., "two-sum")
  domainId: DomainId;       // 'dsa' | 'sql' | 'dbms'
  title: string;
  diff: 'easy' | 'medium' | 'hard';
  topicId: string;          // Primary Pattern/Topic ID
  patternSlug?: string;     // Parent Pattern SEO slug (e.g., "hashing-frequency")
  subTopicId?: string;      // Sub-Pattern ID
  subPatternSlug?: string;  // Parent Sub-Pattern SEO slug (e.g., "hash-frequency")
  tags?: string[];
  isPublished?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface BaseTopic {
  id: string;               // Immutable primary ID (e.g., "p_hashing")
  slug: string;             // SEO-friendly slug (e.g., "hashing-frequency")
  domainId: DomainId;
  name: string;
  displayOrder: number;     // Order for UI rendering
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
  id: string;               // Immutable primary ID (e.g., "sp_hash_freq")
  slug: string;             // SEO-friendly slug (e.g., "hash-frequency")
  topicId: string;          // Parent Topic ID
  patternSlug?: string;     // Parent Pattern SEO slug
  name: string;
  cues: string[];
  thinkAbout?: string;
  coreIdea?: string;
  templateCode?: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  pitfalls?: string[];
}
