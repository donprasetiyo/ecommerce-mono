export interface ErrorInfo {
    message: string;
    status: number;
}

export class CustomError extends Error {
    constructor(public readonly type: string, errorMessage: Record<string, ErrorInfo>) {
        const errorClass = errorMessage[type];
        if (!errorClass){
            throw new Error('Something went wrong')
        }
        super(errorClass.message);
    }
}