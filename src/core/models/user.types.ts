export type UserRole = 'user' | 'admin' | 'editor';

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: UserRole;
  createdAt: string;
}

export interface UserProgress {
  userId?: string;
  solvedQuestions: string[]; // Question slugs or IDs across domains
  bookmarkedQuestions: string[];
  customNotes: Record<string, string>;
  updatedAt?: string;
}
