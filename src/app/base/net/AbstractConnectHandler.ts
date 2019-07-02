import ConnectHandler from '@/app/base/net/ConnectHandler';

export default abstract class AbstractConnectHandler implements ConnectHandler {
    public onBreak(): void {
        // TODO
    }

    public onClose(): void {
        // TODO
    }

    public onConnectStatusChange(isConnected: boolean): void {
        // TODO
    }

    public onError(): void {
        // TODO
    }

    public onIdle(): void {
        // TODO
    }

    public onOpen(): void {
        // TODO
    }

}
