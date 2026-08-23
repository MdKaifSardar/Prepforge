import { db } from '@/core/firebase/firebase';
import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';
import { SqlTopic, SqlQuestion } from '../models/sql.types';

export class SqlService {
  /**
   * Fetch all SQL Topics
   */
  static async getTopics(): Promise<SqlTopic[]> {
    try {
      const colRef = collection(db, 'sql_topics');
      const snap = await getDocs(colRef);
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as SqlTopic));
      }
    } catch (err) {
      console.warn('Firestore SqlService.getTopics warning:', err);
    }
    return [];
  }

  /**
   * Fetch SQL Question by Slug
   */
  static async getQuestionBySlug(slug: string): Promise<SqlQuestion | null> {
    try {
      const qDoc = await getDoc(doc(db, 'sql_questions', slug));
      if (qDoc.exists()) {
        return { id: slug, ...qDoc.data() } as SqlQuestion;
      }
    } catch (err) {
      console.warn(`Firestore SqlService.getQuestionBySlug warning for ${slug}:`, err);
    }
    return null;
  }
}
