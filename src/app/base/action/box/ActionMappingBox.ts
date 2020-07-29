class ActionMappingBox {

    private actionMap: Map<string, object> = new Map<string, object>();
    private methodMap: Map<string, string> = new Map<string, string>();

    public put(actionKey: string, action: object, methodKey: string, method: string): void {
        const key = actionKey + methodKey;
        this.actionMap.set(key, action);
        this.methodMap.set(key, method);
    }

    public getAction(key: string): object {
        const clazz: any = this.actionMap.get(key) as object || null;
        return clazz;
    }

    public getMethod(key: string): string {
        const methodKey: string = this.methodMap.get(key) as string;
        return methodKey;
    }
}

export default new ActionMappingBox();
