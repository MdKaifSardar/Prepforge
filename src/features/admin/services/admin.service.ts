import { db } from '@/core/firebase/firebase';
import { doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { BaseQuestion, BaseTopic } from '@/core/models/domain.types';

export class AdminService {
  /**
   * Create or update any Domain Topic
   */
  static async saveTopic(topic: BaseTopic): Promise<void> {
    const docRef = doc(db, 'topics', String(topic.id));
    await setDoc(docRef, { ...topic, updatedAt: new Date().toISOString() }, { merge: true });
  }

  /**
   * Create or update any Polymorphic Question across domains
   */
  static async saveQuestion(question: BaseQuestion): Promise<void> {
    const docRef = doc(db, 'questions', question.id);
    await setDoc(docRef, { ...question, updatedAt: new Date().toISOString() }, { merge: true });
  }

  /**
   * Delete Question by ID
   */
  static async deleteQuestion(questionId: string): Promise<void> {
    const docRef = doc(db, 'questions', questionId);
    await deleteDoc(docRef);
  }
}
