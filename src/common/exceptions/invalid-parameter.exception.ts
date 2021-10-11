// handling error for invalid input
export class InvalidParameterException extends Error {
    constructor (message: string) {
        super(message);
        this.name = "InvalidParameterException";
    }
}