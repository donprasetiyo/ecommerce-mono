class KafkaTopic {
    user_verification_email_send: string = 'user_verification_email_send'
    user_password_reset_email_send: string = 'user_password_reset_email_send'
}

export const topic = new KafkaTopic();