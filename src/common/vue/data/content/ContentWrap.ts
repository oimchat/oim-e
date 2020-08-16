export default abstract class ContentWrap {

    public type: number = -1;

    public abstract getTimestamp(): number;

    public getData<T extends ContentWrap>(clazz: new (...args: any[]) => T): T {
        return this as any;
    }
}
