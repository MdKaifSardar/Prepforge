import { cache } from 'react';
import { Pattern, SubPattern, Question } from '../models/dsa.types';
import { UserProgress } from '@/core/models/user.types';
import { PATTERNS_DATA } from '@/lib/data/dsa-patterns';
import { db } from '@/core/firebase/firebase';
import { collection, getDocs, doc, getDoc, query, where, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';

function createSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
}

// In-memory singleton cache across requests
let cachedPatterns: Pattern[] | null = null;

async function _fetchPatternsFromSource(): Promise<Pattern[]> {
  if (process.env.NODE_ENV !== 'development' && cachedPatterns) {
    return cachedPatterns;
  }

  try {
    const patternsCol = collection(db, 'patterns');
    const snapshot = await getDocs(patternsCol);
    if (!snapshot.empty) {
      const patternsData = snapshot.docs.map(d => ({ id: Number(d.id), ...d.data() } as Pattern));
      patternsData.sort((a, b) => a.id - b.id);

      const questionsCol = collection(db, 'questions');
      const qSnapshot = await getDocs(questionsCol);
      const allQuestions: Question[] = [];
      if (!qSnapshot.empty) {
        qSnapshot.docs.forEach(d => {
          allQuestions.push(d.data() as Question);
        });
      }

      for (const pattern of patternsData) {
        pattern.questions = allQuestions.filter(q => q.patternId === pattern.id);
      }

      cachedPatterns = patternsData;
      return patternsData;
    }
  } catch (error) {
    console.warn('Firestore fetch fallback to PATTERNS_DATA:', error);
  }

  cachedPatterns = PATTERNS_DATA;
  return PATTERNS_DATA;
}

export const fetchPatternsCached = cache(_fetchPatternsFromSource);

export class DsaService {
  /**
   * Fetch all patterns (Reads from normalized Firestore collections if available)
   */
  static async getPatterns(): Promise<Pattern[]> {
    return await fetchPatternsCached();
  }

  /**
   * Fetch single pattern by ID
   */
  static async getPatternById(patternId: number | string): Promise<Pattern | null> {
    const targetId = Number(patternId);

    try {
      const patternDoc = await getDoc(doc(db, 'patterns', String(targetId)));
      if (patternDoc.exists()) {
        const pattern = { id: targetId, ...patternDoc.data() } as Pattern;

        const subCol = collection(db, 'sub_patterns');
        const subQuery = query(subCol, where('patternId', '==', targetId));
        const subSnap = await getDocs(subQuery);
        if (!subSnap.empty) {
          pattern.subPatterns = subSnap.docs.map(d => d.data() as SubPattern);
        }

        const qCol = collection(db, 'questions');
        const qQuery = query(qCol, where('patternId', '==', targetId));
        const qSnap = await getDocs(qQuery);
        if (!qSnap.empty) {
          pattern.questions = qSnap.docs.map(d => d.data() as Question);
        } else {
          pattern.questions = [];
        }

        return pattern;
      }
    } catch (err) {
      console.warn(`Firestore getPatternById fallback for patternId ${patternId}:`, err);
    }

    const patterns = await this.getPatterns();
    return patterns.find(p => p.id === targetId) || null;
  }

  /**
   * Fetch dedicated sub-pattern by patternId & subId
   */
  static async getSubPattern(patternId: number | string, subId: string): Promise<{ pattern: Pattern; subPattern: SubPattern; questions: Question[] } | null> {
    const targetId = Number(patternId);

    try {
      const subDoc = await getDoc(doc(db, 'sub_patterns', subId));
      const pattern = await this.getPatternById(targetId);

      if (subDoc.exists() && pattern) {
        const subPattern = { id: subId, ...subDoc.data() } as SubPattern;

        const qCol = collection(db, 'questions');
        const qQuery = query(qCol, where('subPatternId', '==', subId));
        const qSnap = await getDocs(qQuery);
        const questions = qSnap.docs.map(d => d.data() as Question);

        return { pattern, subPattern, questions };
      }
    } catch (err) {
      console.warn(`Firestore getSubPattern fallback for subId ${subId}:`, err);
    }

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
    const cleanSlug = slug.toLowerCase().trim();

    try {
      const qDoc = await getDoc(doc(db, 'questions', cleanSlug));
      if (qDoc.exists()) {
        const question = qDoc.data() as Question;
        const pattern = await this.getPatternById(question.patternId || 1);

        if (pattern) {
          const idx = pattern.questions.findIndex(q => {
            const qSlug = (q.id || createSlug(q.title)).toLowerCase();
            const qLc = q.lcNum.toLowerCase().replace(/\s+/g, '');
            return qSlug === cleanSlug || qLc === cleanSlug;
          });

          const index = idx !== -1 ? idx + 1 : 1;
          const prevQ = idx > 0 ? pattern.questions[idx - 1] : undefined;
          const nextQ = idx < pattern.questions.length - 1 ? pattern.questions[idx + 1] : undefined;

          return {
            question,
            pattern,
            index,
            total: pattern.questions.length,
            prevQ,
            nextQ
          };
        }
      }
    } catch (err) {
      console.warn(`Firestore getQuestionBySlug fallback for slug ${cleanSlug}:`, err);
    }

    const patterns = await this.getPatterns();
    for (const pattern of patterns) {
      const idx = pattern.questions.findIndex(q => {
        const qSlug = (q.id || createSlug(q.title)).toLowerCase();
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
    cachedPatterns = null;
    const docRef = doc(db, 'patterns', String(pattern.id));
    await setDoc(docRef, pattern);
  }

  static async updatePattern(patternId: number | string, updates: Partial<Pattern>): Promise<void> {
    cachedPatterns = null;
    const docRef = doc(db, 'patterns', String(patternId));
    await updateDoc(docRef, updates);
  }

  static async deletePattern(patternId: number | string): Promise<void> {
    cachedPatterns = null;
    const docRef = doc(db, 'patterns', String(patternId));
    await deleteDoc(docRef);
  }

  static async syncUserProgress(userId: string, progress: UserProgress): Promise<void> {
    const docRef = doc(db, 'user_progress', userId);
    await setDoc(docRef, { ...progress, updatedAt: new Date().toISOString() }, { merge: true });
  }
}
