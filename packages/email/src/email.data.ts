import {
  EmailData,
  emailSetting,
  emailVerificationData,
  resetPasswordData,
  siteconfig,
} from "@repo/business-config";

export interface EmailContent extends EmailData {
  toAddress: string;
}

function replaceVariables(
  template: string,
  variables: { [key: string]: string },
): string {
  return template.replace(/{(.*?)}/g, (_, key) => variables[key] || "");
}

export const getResetPasswordEmailData = (
  toAddress: string,
  link: string,
  username: string,
): EmailContent => {
  const resetPasswordVariables = {
    username: username,
    link: link,
    expires_at: emailSetting.resetPasswordTokenExpiresWithinInHour,
    sitename: siteconfig.name,
  } as any;

  const resetPasswordEmail: EmailContent = {
    ...resetPasswordData,
    body: replaceVariables(resetPasswordData.body, resetPasswordVariables),
    toAddress: toAddress,
  };

  return resetPasswordEmail;
};

export const getEmailVerificationData = (
  toAddress: string,
  username: string,
  code: string,
): EmailContent => {
  const emailVerificationVariables = {
    username: username,
    code: code,
    sitename: siteconfig.name,
    expires_at: emailSetting.emailVerificationCodeExpiresWithinInHour,
  } as any;

  const emailVerificationEmail: EmailContent = {
    ...emailVerificationData,
    body: replaceVariables(
      emailVerificationData.body,
      emailVerificationVariables,
    ),
    toAddress: toAddress,
  };

  return emailVerificationEmail;
};
