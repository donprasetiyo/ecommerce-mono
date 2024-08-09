import { CustomError, ErrorInfo } from "../error";

type ErrorName =
    'INVALID_VERIFICATION_CODE'
    | 'FAILED_TO_CREATE_NEW_USER'
    | 'USER_CREATED_BUT_EMAIL_VERIFY_FAILED'
    | 'USER_LOGGED_IN_BUT_EMAIL_VERIFY_FAILED'
    | 'INVALID_LOGIN_CREDENTIAL'
    | 'INVALID_EMAIL'
    | 'INVALID_RESET_PASSWORD_TOKEN'
    | 'RESEND_FAILED_MUST_RELOGIN'
    | 'RESET_PASSWORD_GENERIC'
    | 'RESET_PASSWORD_TOKEN_INVALID'
    | 'RESET_PASSWORD_MUST_NEW'
    | 'RESET_PASSWORD_EXPIRED_SESSION'
    | 'UNAUTHORIZED'

export class AuthError extends CustomError {
    static errorMessage: Record<string, ErrorInfo> = {
    'INVALID_VERIFICATION_CODE': { message: 'Verification code is invalid.', status: 400 },
    'FAILED_TO_CREATE_NEW_USER': { message: 'Failed to create a new user account.', status: 500 },
    'USER_CREATED_BUT_EMAIL_VERIFY_FAILED': { message: 'Your account was created but email verification code failed to be sent. Please resent email verification code.', status: 500 },
    'USER_LOGGED_IN_BUT_EMAIL_VERIFY_FAILED': { message: 'You have to verify your email first. However, something went wrong when we send you verification code.', status: 500 },
    'INVALID_LOGIN_CREDENTIAL': { message: 'Invalid username, email, or password.', status: 400 },
    'INVALID_EMAIL': { message: 'Invalid email address. Please ensure it is correct.', status: 400 },
    'INVALID_RESET_PASSWORD_TOKEN': { message: 'Link may have expired. Please request a new reset password link again.', status: 400 },
    'RESEND_FAILED_MUST_RELOGIN': { message: 'Resend failed. You have to login again.', status: 400 },
    'RESET_PASSWORD_GENERIC': { message: 'Reset password failed. Something went wrong.', status: 400 },
    'RESET_PASSWORD_TOKEN_INVALID': { message: 'Reset password request is invalid. The link you used may have been expired.', status: 400 },
    'RESET_PASSWORD_MUST_NEW': { message: 'You should use a new password instead of the old one.', status: 400 },
    'RESET_PASSWORD_EXPIRED_SESSION': { message: 'You have waited over five minutes in this page. Please click the same reset password link we have sent to reset your password and reset your password immediately.', status: 400 },
    'UNAUTHORIZED': { message: 'You are not authorized.', status: 400 },
};
    constructor(type: ErrorName) {
        super(type, AuthError.errorMessage);
    }
}