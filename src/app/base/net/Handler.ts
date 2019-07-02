export default interface Handler {

    onMessage(data: any): void;

    onOpen(): void;

    onClose(e: CloseEvent): void;

    onError(): void;
}
