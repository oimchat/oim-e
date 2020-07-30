import AbstractFactory from '@/app/base/context/AbstractFactory';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import {MaterialType} from '@/app/base/context/MaterialType';

export default class ObjectFactory extends AbstractFactory {

    private map: Map<any, any> = new Map<any, any>();
    private multipleMap: Map<any, any> = new Map<any, any>();

    public register<P, S extends P>(defineClass: new (...args: any[]) => P, instanceClass: S) {
        this.map.set(defineClass, instanceClass);
    }

    public putInstanceClass<T>(key: any, instanceClass: new (...args: any[]) => T) {
        this.map.set(key, instanceClass);
    }

    public getObjectByKey(key: any): any {
        const own = this;
        const map = this.map;
        let o: any;
        const clazz = map.get(key);
        if (clazz) {
            o = super.getObjectByClass(clazz, false, false);
        } else {
            o = super.getObjectByKey(key);
        }
        return o;
    }

    public getSingleObjectByClass<T>(defineClass: new (...args: any[]) => T): T {
        return this.getObjectByClass(defineClass, false, false);
    }

    public getSingleMaterial<T extends AbstractMaterial>(clazz: MaterialType<T>): T {
        return this.getMaterial(clazz, false, false);
    }

    public getObjectByClass<T>(defineClass: new (...args: any[]) => T, createNew: boolean, cover: boolean): T {
        const own = this;
        const map = this.map;
        let o: any;
        const clazz = map.get(defineClass);
        if (clazz) {
            o = super.getObjectByClass(clazz, createNew, cover);
        } else {
            o = super.getObjectByClass(defineClass, createNew, cover);
        }
        return o;
    }
}
