export interface LoginResponse {
  success: boolean;
  email_verified: boolean;
  lastSentVerificationCode?: Date;
  resendToken: string;
}
