import { siteconfig } from "siteconfig"

export interface EmailData {
    fromAddress: string,
    subject: string,
    body: string
}

export const emailSetting = {
    resetPasswordTokenExpiresWithinInHour: 24,
    emailVerificationCodeExpiresWithinInHour: 24
} as const

export const resetPasswordData: EmailData = {
    fromAddress: `noreply@${siteconfig.domain}`,
    subject: 'Password Reset Request for Your Account',
    body: `Dear {username},

We received a request to reset the password for your account. If you made this request, please click the link below to reset your password:

{link}

If you did not request a password reset, please ignore this email and do not give the above link to anyone else for your security.

For your security, this password reset link will expire in {expires_at} hours.

Thank you,
{sitename}`,
}

export const emailVerificationData: EmailData = {
    fromAddress: `noreply@${siteconfig.domain}`,
    subject: 'Email Verification Code',
    body: `Dear {username},

Thank you for registering with {sitename}. To complete your registration, please verify your email address by entering the verification code below:

Verification Code: {code}

If you did not create an account with {sitename}, please ignore this email.

For your security, this password reset link will expire in {expires_at} hours.

Thank you,
{sitename}
`,
}