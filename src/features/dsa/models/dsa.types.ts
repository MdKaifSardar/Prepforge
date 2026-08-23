import { BaseQuestion, BaseTopic, BaseSubTopic } from '@/core/models/domain.types';

export interface CodeSolution {
  explanation: string;
  timeComp: string;
  spaceComp: string;
  cppCode: string;
}

export type BruteForce = CodeSolution;
export type Optimal = CodeSolution;

export interface DsaQuestion extends Partial<Omit<BaseQuestion, 'domainId' | 'topicId'>> {
  slug?: string;
  lcNum: string;
  title: string;
  url: string;
  diff: 'easy' | 'medium' | 'hard';
  patternId?: number;
  subPatternId?: string;
  statement?: string;
  bruteForce: BruteForce;
  optimal: Optimal;
}

export interface DsaSubPattern extends Partial<Omit<BaseSubTopic, 'topicId'>> {
  id: string;
  name: string;
  cues: string[];
  patternId?: number;
  cue?: string; // Legacy fallback
}

export interface DsaPattern extends Partial<Omit<BaseTopic, 'domainId' | 'id'>> {
  id: number;
  name: string;
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
