import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
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

function createSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
}

async function seed() {
  console.log(`Starting Normalized Firestore seeding into project: ${firebaseConfig.projectId}...`);
  
  let totalPatterns = 0;
  let totalSubPatterns = 0;
  let totalQuestions = 0;

  for (const pattern of PATTERNS_DATA) {
    const questionCount = pattern.questions ? pattern.questions.length : 0;
    
    // 1. Upload Sub-patterns
    if (pattern.subPatterns && pattern.subPatterns.length > 0) {
      for (const sub of pattern.subPatterns) {
        const subDocRef = doc(db, 'sub_patterns', sub.id);
        await setDoc(subDocRef, {
          ...sub,
          patternId: pattern.id
        });
        totalSubPatterns++;
      }
    }

    // 2. Upload Questions
    if (pattern.questions && pattern.questions.length > 0) {
      for (const q of pattern.questions) {
        const slug = createSlug(q.title);
        const qDocRef = doc(db, 'questions', slug);
        await setDoc(qDocRef, {
          ...q,
          slug,
          patternId: pattern.id
        });
        totalQuestions++;
      }
    }

    // 3. Upload Pattern (Lightweight document without giant embedded questions array)
    const { questions, ...patternMeta } = pattern;
    const patternDocRef = doc(db, 'patterns', String(pattern.id));
    await setDoc(patternDocRef, {
      ...patternMeta,
      questionCount
    });
    totalPatterns++;

    console.log(`Uploaded Pattern #${pattern.id}: ${pattern.name} (${pattern.subPatterns?.length || 0} sub-patterns, ${questionCount} questions)`);
  }

  console.log(`SUCCESS: Seeded ${totalPatterns} patterns, ${totalSubPatterns} sub-patterns, and ${totalQuestions} questions into Firestore!`);
  process.exit(0);
}

seed().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
