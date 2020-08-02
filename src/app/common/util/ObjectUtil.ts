export default class ObjectUtil {

    public static copyByTargetKey(target: any, source: any): void {

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

    public static copyBySourceKey(target: any, source: any): void {
        for (const k of Object.keys(source)) {
            target[k] = source[k];
        }
    }
}