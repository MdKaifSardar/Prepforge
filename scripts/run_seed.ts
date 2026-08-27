import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { PATTERNS_DATA } from '../src/lib/data/dsa-patterns';
import * as fs from 'fs';
import * as path from 'path';

// Parse .env.local manually
const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const [key, ...valParts] = line.trim().split('=');
    if (key && valParts.length > 0) {
      process.env[key.trim()] = valParts.join('=').trim();
    }
  });
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function wipeCollection(collName: string) {
  const snap = await getDocs(collection(db, collName));
  console.log(`Wiping ${snap.size} old documents from "${collName}"...`);
  const deletePromises = snap.docs.map(d => deleteDoc(doc(db, collName, d.id)));
  await Promise.all(deletePromises);
}

async function seed() {
  console.log(`Starting Fast Clean Firestore seeding into project: ${firebaseConfig.projectId}...`);
  
  // Wipe old stale documents first in parallel
  await Promise.all([
    wipeCollection('patterns'),
    wipeCollection('sub_patterns'),
    wipeCollection('questions')
  ]);

  let totalPatterns = 0;
  let totalSubPatterns = 0;
  let totalQuestions = 0;

  const uploadPromises: Promise<any>[] = [];

  for (const pattern of PATTERNS_DATA) {
    const questionCount = pattern.questions ? pattern.questions.length : 0;
    const patternDocId = String(pattern.id);
    
    // 1. Upload Sub-patterns
    if (pattern.subPatterns && pattern.subPatterns.length > 0) {
      for (const sub of pattern.subPatterns) {
        const subDocRef = doc(db, 'sub_patterns', String(sub.id));
        uploadPromises.push(setDoc(subDocRef, {
          ...sub,
          patternId: patternDocId,
          patternSlug: pattern.slug,
          domainId: 'dsa'
        }));
        totalSubPatterns++;
      }
    }

    // 2. Upload Questions
    if (pattern.questions && pattern.questions.length > 0) {
      for (const q of pattern.questions) {
        const qDocId = String(q.id);
        const qDocRef = doc(db, 'questions', qDocId);
        uploadPromises.push(setDoc(qDocRef, {
          ...q,
          id: qDocId,
          patternId: patternDocId,
          patternSlug: pattern.slug,
          domainId: 'dsa'
        }));
        totalQuestions++;
      }
    }

    // 3. Upload Pattern Metadata
    const { questions, ...patternMeta } = pattern;
    uploadPromises.push(setDoc(doc(db, 'patterns', patternDocId), {
      ...patternMeta,
      id: patternDocId,
      domainId: 'dsa',
      questionCount
    }));
    totalPatterns++;
  }

  await Promise.all(uploadPromises);

  console.log(`\n🎉 SUCCESS: Cleaned and Seeded ${totalPatterns} patterns, ${totalSubPatterns} sub-patterns, and ${totalQuestions} questions into Firestore!`);
  process.exit(0);
}

seed().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
