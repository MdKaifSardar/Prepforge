import { db } from '@/core/firebase/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { DbmsTopic, DbmsQuestion } from '../models/dbms.types';

export class DbmsService {
  /**
   * Fetch all DBMS Topics
   */
  static async getTopics(): Promise<DbmsTopic[]> {
    try {
      const colRef = collection(db, 'dbms_topics');
      const snap = await getDocs(colRef);
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as DbmsTopic));
      }
    } catch (err) {
      console.warn('Firestore DbmsService.getTopics warning:', err);
    }
    return [];
  }

  /**
   * Fetch DBMS Question by Slug
   */
  static async getQuestionBySlug(slug: string): Promise<DbmsQuestion | null> {
    try {
      const qDoc = await getDoc(doc(db, 'dbms_questions', slug));
      if (qDoc.exists()) {
        return { id: slug, ...qDoc.data() } as DbmsQuestion;
      }
    } catch (err) {
      console.warn(`Firestore DbmsService.getQuestionBySlug warning for ${slug}:`, err);
    }
    return null;
  }
}
