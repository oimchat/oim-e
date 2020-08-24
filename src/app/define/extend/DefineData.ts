import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import DefineExtendStore from '@/app/define/extend/DefineExtendStore';

export default abstract class DefineData extends AbstractMaterial {

    public getKey(): any {
        const own = this;
        return own.constructor.name;
    }

    get has(): boolean {
        const own = this;
        const key = own.getKey();
        const store: DefineExtendStore = this.appContext.getMaterial(DefineExtendStore);
        return store.has(key);
    }

    public get(): any {
        const own = this;
        const key = own.getKey();
        const store: DefineExtendStore = this.appContext.getMaterial(DefineExtendStore);
        return store.get(key);
    }
}
