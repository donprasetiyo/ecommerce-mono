import { send } from "./aws-ses/send";
import { getEmailVerificationData, getResetPasswordEmailData } from "./email.data";

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