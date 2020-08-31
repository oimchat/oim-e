export default class MenuItemData {
    public key: string = '';
    public data: any = {};
    public text: string = '';
    public icon: string = '';
    public children: MenuItemData[] = [];
    private attributeMap: Map<string, any> = new Map<string, any>();

    public addAttribute(key: string, value: any) {
        this.attributeMap.set(key, value);
    }

    public getAttribute(key: string): any {
        return this.attributeMap.get(key);
    }
}
