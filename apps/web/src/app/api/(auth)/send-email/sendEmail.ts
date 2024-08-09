import { SendEmailCommand } from "@aws-sdk/client-ses";

import { sesClient } from "./client";
import {
  EmailContent,
  getEmailVerificationData,
  getResetPasswordEmailData,
} from "./getEmailData";

const send = async (data: EmailContent) => {
  const sendEmailCommand = sendEmailSes(
    data.toAddress,
    data.fromAddress,
    data.body,
    data.subject,
  );

  try {
    return await sesClient.send(sendEmailCommand);
  } catch (caught) {
    if (caught instanceof Error && caught.name === "MessageRejected") {
      /** @type { import('@aws-sdk/client-ses').MessageRejected} */
      const messageRejectedError = caught;
      return messageRejectedError;
    }
    throw caught;
  }
};

export const sendEmailSes = (
  toAddress: string,
  fromAddress: string,
  plainTextContent: string,
  subject: string,
) => {
  return new SendEmailCommand({
    Destination: {
      /* required */
      CcAddresses: [
        /* more items */
      ],
      ToAddresses: [
        toAddress,
        /* more To-email addresses */
      ],
    },
    Message: {
      /* required */
      Body: {
        /* required */
        // Html: {
        //     Charset: "UTF-8",
        //     Data: bodyHtml,
        // },
        Text: {
          Charset: "UTF-8",
          Data: plainTextContent,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [
      /* more items */
    ],
  });
};

export const sendResetPasswordEmail = async (
  toAddress: string,
  link: string,
  username: string,
) => {
  const data = getResetPasswordEmailData(toAddress, link, username);
  await send(data);
};

export const sendEmailVerificationCode = async (
  toAddress: string,
  code: string,
  username: string,
): Promise<string | undefined> => {
  try {
    const data = getEmailVerificationData(toAddress, username, code);
    await send(data);
    return code;
  } catch (error) {
    return undefined;
  }
};
