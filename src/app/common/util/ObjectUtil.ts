export default class ObjectUtil {

    public static create<T>(clazz: new (...args: any[]) => T, ...args: any[]): T {
        let o: any;
        o = new clazz(args);
        return o;
    }

    public static convert<T>(clazz: new (...args: any[]) => T, source: any): T {
        const target = new clazz();
        ObjectUtil.copyByTargetKey(target, source);
        return target;
    }

    public static copyByTargetKey(target: any, source: any): void {
        if (target && source) {

            const isTargetArray = (target instanceof Array);
            const isSourceArray = (source instanceof Array);

            const isArray = isTargetArray && isSourceArray;
            const isObject = !isTargetArray && !isSourceArray;

            const keys: string[] = Object.keys(source);
            const keyMap: Map<string, string> = new Map<string, string>();
            for (const k of keys) {
                keyMap.set(k, k);
            }

            for (const k of Object.keys(target)) {
                if (keyMap.has(k)) {
                    target[k] = source[k];
                }
            }
        }
    }

    public static copyBySourceKey(target: any, source: any): void {
        if (target && source) {
            for (const k of Object.keys(source)) {
                target[k] = source[k];
            }
        }
    }
}
