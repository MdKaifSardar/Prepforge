export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface SignupCredentials {
  displayName: string;
  email: string;
  password?: string;
}

export interface AuthSessionResponse {
  success: boolean;
  message?: string;
}
