/**
 * Format Firebase Auth errors into clean, human-readable user messages
 */
export function formatAuthError(error: any): string {
  if (!error) return 'An unexpected error occurred. Please try again.';

  const code = typeof error === 'string' ? error : error?.code || error?.message || '';

  if (code.includes('auth/popup-closed-by-user')) {
    return 'Sign-in window was closed before completion. Please try again.';
  }

  if (code.includes('auth/popup-blocked')) {
    return 'Sign-in popup was blocked by your browser. Please allow popups for this site.';
  }

  if (code.includes('auth/invalid-credential') || code.includes('auth/wrong-password') || code.includes('auth/user-not-found')) {
    return 'Invalid email or password. Please check your credentials and try again.';
  }

  if (code.includes('auth/email-already-in-use')) {
    return 'An account with this email address already exists. Please sign in instead.';
  }

  if (code.includes('auth/weak-password')) {
    return 'Password is too weak. Please use at least 6 characters.';
  }

  if (code.includes('auth/too-many-requests')) {
    return 'Too many unsuccessful attempts. Access disabled temporarily. Please try again later.';
  }

  if (code.includes('auth/unauthorized-domain')) {
    return 'This domain is not authorized for authentication in Firebase Console. Please add it under Auth Settings -> Authorized Domains.';
  }

  if (code.includes('auth/network-request-failed')) {
    return 'Network request failed. Please check your internet connection.';
  }

  return error?.message || 'Authentication failed. Please try again.';
}
