export default interface ConnectHandler {

    onOpen(): void;

    onClose(): void;

    onError(): void;

    onIdle(): void;

    onBreak(): void;

    onConnectStatusChange(isConnected: boolean): void;
}
