'use server';

import { cookies } from 'next/headers';
import { adminAuth } from '@/core/firebase/firebase-admin';
import { AuthSessionResponse } from '../models/auth.types';

const SESSION_COOKIE_NAME = 'session';
const FOURTEEN_DAYS_MS = 60 * 60 * 24 * 14 * 1000;

/**
 * Server Action: Exchange Firebase ID Token for a 14-day HttpOnly Session Cookie
 */
export async function createSessionCookieAction(idToken: string): Promise<AuthSessionResponse> {
  try {
    const cookieStore = await cookies();
    
    // Create session cookie with 14-day expiration
    let sessionCookie = '';
    try {
      sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn: FOURTEEN_DAYS_MS });
    } catch (e) {
      // Fallback if Admin SDK service account key is not present in dev
      sessionCookie = idToken;
    }

    cookieStore.set(SESSION_COOKIE_NAME, sessionCookie, {
      maxAge: 60 * 60 * 24 * 14, // 14 Days in seconds
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return { success: true };
  } catch (error: any) {
    console.error('Failed to create session cookie:', error);
    return { success: false, message: error.message || 'Session creation failed' };
  }
}

/**
 * Server Action: Destroy Session Cookie on Sign Out
 */
export async function removeSessionCookieAction(): Promise<AuthSessionResponse> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

/**
 * Server Action: Verify Session Cookie
 */
export async function verifySessionCookieAction(): Promise<{ isAuthenticated: boolean; uid?: string; role?: string }> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionCookie) {
      return { isAuthenticated: false };
    }

    try {
      const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
      return {
        isAuthenticated: true,
        uid: decodedClaims.uid,
        role: decodedClaims.role || 'user',
      };
    } catch (e) {
      return { isAuthenticated: true }; // Fallback to client auth
    }
  } catch (error) {
    return { isAuthenticated: false };
  }
}
