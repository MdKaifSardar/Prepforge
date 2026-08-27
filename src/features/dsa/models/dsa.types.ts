import { BaseQuestion, BaseTopic, BaseSubTopic } from '@/core/models/domain.types';

export interface CodeSolution {
  explanation: string;
  timeComp: string;
  spaceComp: string;
  cppCode: string;
}

export type BruteForce = CodeSolution;
export type Optimal = CodeSolution;

export interface ProblemExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface DsaQuestion extends Partial<Omit<BaseQuestion, 'domainId'>> {
  id: string;               // Immutable ID (e.g. "q_two_sum")
  slug: string;             // SEO slug (e.g. "two-sum")
  patternSlug: string;     // Parent Pattern SEO slug (e.g. "hashing-frequency")
  subPatternSlug?: string;  // Parent Sub-Pattern SEO slug (e.g. "hash-frequency")
  lcNum: string;
  title: string;
  url: string;
  diff: 'easy' | 'medium' | 'hard';
  patternId: string | number;
  subPatternId?: string;
  statement?: string;           // Legacy / Fallback
  detailedDescription?: string; // Rich problem overview & constraints
  examples?: ProblemExample[];  // Structured Input/Output example sets
  bruteForce: BruteForce;
  optimal: Optimal;
}

export interface DsaSubPattern extends Partial<BaseSubTopic> {
  id: string;               // Immutable ID (e.g. "sp_hash_freq")
  slug: string;             // SEO slug (e.g. "hash-frequency")
  patternSlug: string;     // Parent Pattern SEO slug
  name: string;
  cues: string[];
  patternId: string | number;
  cue?: string; // Legacy fallback
}

export interface DsaPattern extends Partial<Omit<BaseTopic, 'domainId' | 'id'>> {
  id: string | number;      // Immutable ID (e.g. "p_hashing" or legacy 1)
  slug: string;             // SEO slug (e.g. "hashing-frequency")
  name: string;
  displayOrder: number;     // UI rendering order
  cues: string[];
  thinkAbout: string;
  coreIdea: string;
  templateLabel: string;
  templateCode: string;
  timeComplexity: string;
  spaceComplexity: string;
  pitfalls: string[];
  subPatterns?: DsaSubPattern[];
  questions: DsaQuestion[];
  questionCount?: number;
}

// Aliases for seamless migration
export type Question = DsaQuestion;
export type SubPattern = DsaSubPattern;
export type Pattern = DsaPattern;
