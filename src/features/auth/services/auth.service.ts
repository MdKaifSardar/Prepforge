import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  sendPasswordResetEmail, 
  signOut,
  User 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/core/firebase/firebase';
import { UserProfile } from '@/core/models/user.types';
import { createSessionCookieAction, removeSessionCookieAction } from '../actions/auth.actions';

export class AuthService {
  /**
   * Sync or create user profile document in Firestore (/users/{uid})
   */
  static async syncUserProfile(user: User): Promise<UserProfile> {
    try {
      const userRef = doc(db, 'users', user.uid);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        return snap.data() as UserProfile;
      }

      const providerId = user.providerData[0]?.providerId || 'password';
      const newProfile: UserProfile = {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || user.email?.split('@')[0] || 'Member',
        photoURL: user.photoURL || undefined,
        role: 'user', // Default role
        providerId,
        emailVerified: user.emailVerified,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await setDoc(userRef, newProfile);
      return newProfile;
    } catch (err) {
      console.warn('Firestore profile sync failed, using in-memory fallback profile:', err);
      return {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || user.email?.split('@')[0] || 'Member',
        photoURL: user.photoURL || undefined,
        role: 'user',
        providerId: user.providerData[0]?.providerId || 'password',
        emailVerified: user.emailVerified,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }
  }

  /**
   * Sign In / Sign Up with Google OAuth
   */
  static async loginWithGoogle(): Promise<{ user: User; profile: UserProfile }> {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const result = await signInWithPopup(auth, provider);
    
    // Sync profile & create 14-day HttpOnly session cookie
    const profile = await this.syncUserProfile(result.user);
    const idToken = await result.user.getIdToken();
    try {
      await createSessionCookieAction(idToken);
    } catch (err) {
      console.warn('Session cookie creation deferred:', err);
    }

    return { user: result.user, profile };
  }

  /**
   * Login with Email & Password
   */
  static async loginWithEmail(email: string, password?: string): Promise<{ user: User; profile: UserProfile }> {
    if (!password) throw new Error('Password is required');
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const profile = await this.syncUserProfile(credential.user);
    
    const idToken = await credential.user.getIdToken();
    try {
      await createSessionCookieAction(idToken);
    } catch (err) {
      console.warn('Session cookie creation deferred:', err);
    }

    return { user: credential.user, profile };
  }

  /**
   * Sign Up with Email & Password
   */
  static async signupWithEmail(email: string, password?: string, displayName?: string): Promise<{ user: User; profile: UserProfile }> {
    if (!password) throw new Error('Password is required');
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    
    if (displayName) {
      await updateProfile(credential.user, { displayName });
    }

    const profile = await this.syncUserProfile(credential.user);
    const idToken = await credential.user.getIdToken();
    try {
      await createSessionCookieAction(idToken);
    } catch (err) {
      console.warn('Session cookie creation deferred:', err);
    }

    return { user: credential.user, profile };
  }

  /**
   * Trigger Password Reset Email
   */
  static async sendPasswordReset(email: string): Promise<void> {
    await sendPasswordResetEmail(auth, email);
  }

  /**
   * Logout User & clear session cookie
   */
  static async logout(): Promise<void> {
    try {
      await removeSessionCookieAction();
    } catch (err) {
      console.warn('Server session cookie removal warning:', err);
    }
    await signOut(auth);
  }
}

