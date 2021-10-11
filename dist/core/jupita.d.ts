export declare class Jupita {
    private readonly token;
    private readonly touchpointId;
    constructor(token: string, touchpointId: string);
    dump(text: string, inputId: number, messageType?: number, isCall?: boolean, listener?: Listener): void;
    private request;
}
