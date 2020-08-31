import WriteExtend from '@/views/component/chat/extend/WriteExtend';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';

export default class WriteExtendStore extends AbstractMaterial {

    private map: Map<any, WriteExtend> = new Map<any, WriteExtend>();

    public put(key: any, extend: WriteExtend) {
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

    public get(key: any): WriteExtend {
        const value: any = this.map.get(key);
        return value;
    }
}
