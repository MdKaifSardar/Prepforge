import { cache } from 'react';
import { Pattern, SubPattern, Question } from '../models/dsa.types';
import { UserProgress } from '@/core/models/user.types';
import { PATTERNS_DATA } from '@/lib/data/dsa-patterns';
import { db } from '@/core/firebase/firebase';
import { collection, getDocs, doc, getDoc, query, where, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';

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
      const patternsData = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Pattern));
      patternsData.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

      const questionsCol = collection(db, 'questions');
      const qSnapshot = await getDocs(questionsCol);
      const allQuestions: Question[] = [];
      if (!qSnapshot.empty) {
        qSnapshot.docs.forEach(d => {
          allQuestions.push(d.data() as Question);
        });
      }

      for (const pattern of patternsData) {
        pattern.questions = allQuestions.filter(q => q.patternSlug === pattern.slug || String(q.patternId) === String(pattern.id));
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
   * Fetch all patterns sorted by displayOrder
   */
  static async getPatterns(): Promise<Pattern[]> {
    return await fetchPatternsCached();
  }

  /**
   * Fetch single pattern by SEO Slug (or fallback ID)
   */
  static async getPatternBySlug(patternSlug: string): Promise<Pattern | null> {
    const cleanSlug = patternSlug.toLowerCase().trim();

    try {
      const pCol = collection(db, 'patterns');
      const q = query(pCol, where('slug', '==', cleanSlug));
      const snap = await getDocs(q);

      if (!snap.empty) {
        const patternDoc = snap.docs[0];
        const pattern = { id: patternDoc.id, ...patternDoc.data() } as Pattern;

        const subCol = collection(db, 'sub_patterns');
        const subQuery = query(subCol, where('patternSlug', '==', cleanSlug));
        const subSnap = await getDocs(subQuery);
        if (!subSnap.empty) {
          pattern.subPatterns = subSnap.docs.map(d => d.data() as SubPattern);
        }

        const qCol = collection(db, 'questions');
        const qQuery = query(qCol, where('patternSlug', '==', cleanSlug));
        const qSnap = await getDocs(qQuery);
        if (!qSnap.empty) {
          pattern.questions = qSnap.docs.map(d => d.data() as Question);
        } else {
          pattern.questions = [];
        }

        return pattern;
      }
    } catch (err) {
      console.warn(`Firestore getPatternBySlug fallback for slug ${cleanSlug}:`, err);
    }

    const patterns = await this.getPatterns();
    return patterns.find(p => p.slug === cleanSlug || String(p.id) === cleanSlug) || null;
  }

  /**
   * Fetch single pattern by immutable ID
   */
  static async getPatternById(patternId: string | number): Promise<Pattern | null> {
    const targetId = String(patternId);

    try {
      const patternDoc = await getDoc(doc(db, 'patterns', targetId));
      if (patternDoc.exists()) {
        const pattern = { id: patternDoc.id, ...patternDoc.data() } as Pattern;

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
      console.warn(`Firestore getPatternById fallback for patternId ${targetId}:`, err);
    }

    const patterns = await this.getPatterns();
    return patterns.find(p => String(p.id) === targetId) || null;
  }

  /**
   * Fetch dedicated sub-pattern by patternSlug & subPatternSlug
   */
  static async getSubPatternBySlug(patternSlug: string, subPatternSlug: string): Promise<{ pattern: Pattern; subPattern: SubPattern; questions: Question[] } | null> {
    const pattern = await this.getPatternBySlug(patternSlug);
    if (!pattern) return null;

    const subPattern = (pattern.subPatterns || []).find(sp => sp.slug === subPatternSlug || sp.id === subPatternSlug);
    if (!subPattern) return null;

    const questions = (pattern.questions || []).filter(q => q.subPatternSlug === subPatternSlug || q.subPatternId === subPattern.id);
    return { pattern, subPattern, questions };
  }

  /**
   * Fetch question by Composite SEO Slugs (patternSlug + questionSlug)
   */
  static async getQuestionByCompositeSlug(patternSlug: string, questionSlug: string): Promise<{ question: Question; pattern: Pattern; index: number; total: number; prevQ?: Question; nextQ?: Question } | null> {
    const cleanPatternSlug = patternSlug.toLowerCase().trim();
    const cleanQuestionSlug = questionSlug.toLowerCase().trim();

    try {
      const qCol = collection(db, 'questions');
      const qQuery = query(qCol, where('patternSlug', '==', cleanPatternSlug), where('slug', '==', cleanQuestionSlug));
      const qSnap = await getDocs(qQuery);

      if (!qSnap.empty) {
        const questionDoc = qSnap.docs[0];
        const question = { id: questionDoc.id, ...questionDoc.data() } as Question;
        const pattern = await this.getPatternBySlug(cleanPatternSlug);

        if (pattern) {
          const idx = pattern.questions.findIndex(q => q.slug === cleanQuestionSlug || q.id === question.id);
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
      console.warn(`Firestore getQuestionByCompositeSlug fallback for ${cleanPatternSlug}/${cleanQuestionSlug}:`, err);
    }

    // Fallback lookup
    const pattern = await this.getPatternBySlug(cleanPatternSlug);
    if (!pattern) return null;

    const idx = pattern.questions.findIndex(q => q.slug === cleanQuestionSlug || String(q.id) === cleanQuestionSlug);
    if (idx === -1) return null;

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

  /**
   * Fetch question by Immutable Primary ID (for User Bookmarks / Progress)
   */
  static async getQuestionById(questionId: string): Promise<Question | null> {
    try {
      const qDoc = await getDoc(doc(db, 'questions', questionId));
      if (qDoc.exists()) {
        return { id: qDoc.id, ...qDoc.data() } as Question;
      }
    } catch (err) {
      console.warn(`Firestore getQuestionById fallback for ${questionId}:`, err);
    }

    const patterns = await this.getPatterns();
    for (const pattern of patterns) {
      const found = pattern.questions.find(q => String(q.id) === questionId);
      if (found) return found;
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

  static async updatePattern(patternId: string | number, updates: Partial<Pattern>): Promise<void> {
    cachedPatterns = null;
    const docRef = doc(db, 'patterns', String(patternId));
    await updateDoc(docRef, updates);
  }

  static async deletePattern(patternId: string | number): Promise<void> {
    cachedPatterns = null;
    const docRef = doc(db, 'patterns', String(patternId));
    await deleteDoc(docRef);
  }

  static async syncUserProgress(userId: string, progress: UserProgress): Promise<void> {
    const docRef = doc(db, 'user_progress', userId);
    await setDoc(docRef, { ...progress, updatedAt: new Date().toISOString() }, { merge: true });
  }
}
