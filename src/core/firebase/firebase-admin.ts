import { initializeApp, getApps, getApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'interview-prep-b47f1';

const adminApp = !getApps().length
  ? initializeApp({ projectId })
  : getApp();

export const adminAuth = getAuth(adminApp);
export const adminDb = getFirestore(adminApp);
