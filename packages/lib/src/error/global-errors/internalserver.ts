import { CustomError, ErrorInfo } from "../error";

type ErrorName =
    'TOKEN_CHECKING'
    | ''

export class InternalServerError extends CustomError {
    static errorMessage: Record<string, ErrorInfo> = {
    'BALANCE_CHECKING': { message: 'Error when checking token number.', status: 500 },
    '': { message: 'You are not authorized.', status: 500 },
};
    constructor(type: ErrorName) {
        super(type, InternalServerError.errorMessage);
    }
}