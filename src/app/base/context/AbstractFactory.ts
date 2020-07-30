import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import MaterialUtil from '@/app/base/context/MaterialUtil';
import {MaterialType} from '@/app/base/context/MaterialType';


export default class AbstractFactory extends AbstractMaterial {

    private objectMap: Map<any, any> = new Map<any, any>();

    public putObject(key: any, object: any): void {
        this.objectMap.set(key, object);
    }

    public getObjectByKey(key: any): any {
        return this.objectMap.get(key);
    }

    public getMaterial<T extends AbstractMaterial>(clazz: MaterialType<T>, createNew: boolean, cover: boolean): T {
        const own = this;
        const map = this.objectMap;
        let o = map.get(clazz);

        if (clazz) {
            const has = map.has(clazz);
            // TODO
            // 不知道同步对象有没有必要写，先注释吧
            if (!has || createNew) {
                o = own.createMaterial(clazz);
                // 原来对象不存在，或者覆盖，并且新创建的对象不能为空
                if ((!has || cover) && o) {
                    map.set(clazz, o);
                }
            }
        }
        return o;
    }

    public getObjectByClass<T>(clazz: new (...args: any[]) => T, createNew: boolean, cover: boolean): T {

        const own = this;
        const map = this.objectMap;
        let o = map.get(clazz);

        if (clazz) {
            const has = map.has(clazz);
            // TODO
            // 不知道同步对象有没有必要写，先注释吧
            if (!has || createNew) {
                o = own.createObjectByClass(clazz);
                // 原来对象不存在，或者覆盖，并且新创建的对象不能为空
                if ((!has || cover) && o) {
                    map.set(clazz, o);
                }
            }
        }
        return o;
    }

    public createObjectByClass<T>(clazz: new (...args: any[]) => T): T {
        let o = this.objectMap.get(clazz);
        if (!o) {
            o = new clazz();
            if (o instanceof AbstractMaterial) {
                o = new clazz(this);
            } else if (MaterialUtil.instanceOfMaterial(o)) {
                o.setAppContext(this.appContext);
            }
        }
        return o;
    }

    public createMaterial<T extends AbstractMaterial>(clazz: MaterialType<T>): T {
        // public getObjectByClass<T>(clazz: Constructor<T>): T {
        let o = this.objectMap.get(clazz);
        if (!o) {
            o = new clazz(this.appContext);
        }
        return o;
    }
}
