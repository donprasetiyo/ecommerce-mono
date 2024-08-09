import { CustomError, ErrorInfo } from "../error";

type ErrorName =
    'MISSING_PARAMETERS'
    | 'UNAUTHORIZED'

export class BadRequestError extends CustomError {
    static errorMessage: Record<string, ErrorInfo> = {
    'MISSING_PARAMETERS': { message: 'Something went wrong.', status: 400 },
    'UNAUTHORIZED': { message: 'You are not authorized.', status: 400 },
};
    constructor(type: ErrorName) {
        super(type, BadRequestError.errorMessage);
    }
}