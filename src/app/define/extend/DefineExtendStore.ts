import AbstractMaterial from '@/app/base/context/AbstractMaterial';

export default class DefineExtendStore extends AbstractMaterial {

    private map: Map<any, AbstractMaterial> = new Map<any, AbstractMaterial>();

    public put(key: any, extend: AbstractMaterial) {
        this.map.set(key, extend);
    }

    public has(key: string): boolean {
        let has = false;
        const map = this.map;
        const item = map.get(key);
        if (map.has(key) && item) {
            has = true;
        }
        return has;
    }

    public delete(key: any) {
        this.map.delete(key);
    }

    public get(key: any): any {
        const value: any = this.map.get(key);
        return value;
    }
}
