import AbstractMaterial from '@/app/base/AbstractMaterial';
import MessageAppendType from '@/app/com/main/setting/message/type/MessageAppendType';

class BaseTypeSetting extends AbstractMaterial {

    private defaultType: number = MessageAppendType.last;
    private map: Map<string, number> = new Map<string, number>();

    public getType(key: string): number {
        let type = this.defaultType;
        const map = this.map;
        if (map.has(key)) {
            const t = map.get(key);
            if (t) {
                type = t;
            }
        }
        return type;
    }

    public putType(key: string, type: number) {
        if (key && type) {
            this.map.set(key, type);
        }
    }

    public getDefaultType() {
        return this.defaultType;
    }

    public setDefaultType(defaultType: number) {
        this.defaultType = defaultType;
    }
}

export default BaseTypeSetting;
