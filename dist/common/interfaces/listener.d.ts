interface Listener {
    onSuccess(response: object): void;
    onError(statusCode: string, response: object): void;
}
