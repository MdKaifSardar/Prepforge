import { cache } from 'react';
import { Pattern, SubPattern, Question, UserProgress } from '../models/dsa.types';
import { PATTERNS_DATA } from '../data/dsa-patterns';
import { db } from '../firebase';
import { collection, getDocs, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';

// In-memory singleton cache across requests
let cachedPatterns: Pattern[] | null = null;

async function _fetchPatternsFromSource(): Promise<Pattern[]> {
  // If in development mode, skip in-memory singleton cache to ensure F5 yields fresh data
  if (process.env.NODE_ENV !== 'development' && cachedPatterns) {
    return cachedPatterns;
  }

  try {
    const patternsCol = collection(db, 'patterns');
    const snapshot = await getDocs(patternsCol);
    if (!snapshot.empty) {
      const docsData = snapshot.docs.map(doc => ({ id: Number(doc.id), ...doc.data() } as Pattern));
      docsData.sort((a, b) => a.id - b.id);
      cachedPatterns = docsData;
      return docsData;
    }
  } catch (error) {
    console.warn('Firestore fetch fallback to PATTERNS_DATA:', error);
  }

  cachedPatterns = PATTERNS_DATA;
  return PATTERNS_DATA;
}

// React cache() memoizes calls during a single request render pass
export const fetchPatternsCached = cache(_fetchPatternsFromSource);

export class DsaService {
  /**
   * Fetch all patterns (Reads from Firestore if available, falls back to pre-bundled dataset)
   */
  static async getPatterns(): Promise<Pattern[]> {
    return await fetchPatternsCached();
  }

  /**
   * Fetch single pattern by ID
   */
  static async getPatternById(patternId: number | string): Promise<Pattern | null> {
    const patterns = await this.getPatterns();
    const targetId = Number(patternId);
    return patterns.find(p => p.id === targetId) || null;
  }

  /**
   * Fetch dedicated sub-pattern by patternId & subId
   */
  static async getSubPattern(patternId: number | string, subId: string): Promise<{ pattern: Pattern; subPattern: SubPattern; questions: Question[] } | null> {
    const pattern = await this.getPatternById(patternId);
    if (!pattern || !pattern.subPatterns) return null;

    const subPattern = pattern.subPatterns.find(sp => sp.id === subId);
    if (!subPattern) return null;

    const questions = pattern.questions.filter(q => q.subPatternId === subId);
    return { pattern, subPattern, questions };
  }

  /**
   * Fetch question by URL slug (e.g. "koko-eating-bananas" or "two-sum")
   */
  static async getQuestionBySlug(slug: string): Promise<{ question: Question; pattern: Pattern; index: number; total: number; prevQ?: Question; nextQ?: Question } | null> {
    const patterns = await this.getPatterns();
    const cleanSlug = slug.toLowerCase().trim();

    for (const pattern of patterns) {
      const idx = pattern.questions.findIndex(q => {
        const qSlug = q.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
        const qLc = q.lcNum.toLowerCase().replace(/\s+/g, '');
        return qSlug === cleanSlug || qLc === cleanSlug;
      });

      if (idx !== -1) {
        const question = pattern.questions[idx];
        const prevQ = idx > 0 ? pattern.questions[idx - 1] : undefined;
        const nextQ = idx < pattern.questions.length - 1 ? pattern.questions[idx + 1] : undefined;

        return {
          question,
          pattern,
          index: idx + 1,
          total: pattern.questions.length,
          prevQ,
          nextQ
        };
      }
    }
    return null;
  }

  // --------------------------------------------------------------------------
  // FUTURE-PROOF CRUD METHODS (Ready for Admin Dashboard)
  // --------------------------------------------------------------------------

  static async createPattern(pattern: Pattern): Promise<void> {
    cachedPatterns = null; // Invalidate cache
    const docRef = doc(db, 'patterns', String(pattern.id));
    await setDoc(docRef, pattern);
  }

  static async updatePattern(patternId: number | string, updates: Partial<Pattern>): Promise<void> {
    cachedPatterns = null; // Invalidate cache
    const docRef = doc(db, 'patterns', String(patternId));
    await updateDoc(docRef, updates);
  }

  static async deletePattern(patternId: number | string): Promise<void> {
    cachedPatterns = null; // Invalidate cache
    const docRef = doc(db, 'patterns', String(patternId));
    await deleteDoc(docRef);
  }

  static async syncUserProgress(userId: string, progress: UserProgress): Promise<void> {
    const docRef = doc(db, 'user_progress', userId);
    await setDoc(docRef, { ...progress, updatedAt: new Date().toISOString() }, { merge: true });
  }
}
