export interface BruteForce {
  explanation: string;
  timeComp: string;
  spaceComp: string;
  cppCode: string;
}

export interface Optimal {
  explanation: string;
  timeComp: string;
  spaceComp: string;
  cppCode: string;
}

export interface Question {
  lcNum: string;
  title: string;
  url: string;
  diff: 'easy' | 'medium' | 'hard';
  subPatternId?: string;
  statement?: string;
  bruteForce: BruteForce;
  optimal: Optimal;
}

export interface SubPattern {
  id: string;
  name: string;
  cues: string[];
  thinkAbout?: string;
  coreIdea?: string;
  templateCode?: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  pitfalls?: string[];
  cue?: string; // Legacy fallback
}

export interface Pattern {
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
  subPatterns?: SubPattern[];
  questions: Question[];
}

export interface UserProgress {
  userId?: string;
  solvedQuestions: string[]; // Question LC numbers or slugs
  bookmarkedQuestions: string[];
  customNotes: Record<string, string>;
  updatedAt?: string;
}
