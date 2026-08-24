export type UserRole = 'user' | 'admin' | 'editor';

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: UserRole;
  providerId?: string; // 'google.com' | 'password'
  emailVerified?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface UserProgress {
  userId?: string;
  solvedQuestions: string[];
  bookmarkedQuestions: string[];
  customNotes: Record<string, string>;
  updatedAt?: string;
}
