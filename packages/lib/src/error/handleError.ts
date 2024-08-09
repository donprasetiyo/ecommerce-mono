import { BadRequestError } from "./global-errors/badrequest";
import { ZodError } from "zod";
import { AuthError } from "./auth/auth-error";

export function handleError(error: any, generalErrorSourceName: string): { status: number, message: string } {
    if (error instanceof ZodError) {
        const {status, message } = BadRequestError.errorMessage['MISSING_PARAMETERS'] as any;
        return { status, message };
    }

    const listOfErrorClasses: any[] = [BadRequestError, AuthError];
    for (const errorClass of listOfErrorClasses) {
        if (error instanceof errorClass && errorClass.errorMessage[error.type]) {
            const { status, message } = errorClass.errorMessage[error.type];
            return { status, message };
        }
    }

    return { status: 500, message: 'Unhandled error' };
}