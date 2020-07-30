import AppContext from '@/app/base/context/AppContext';
import actionMappingBox from '@/app/base/action/box/ActionMappingBox';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';

class ActionBox extends AbstractMaterial {

    private map: Map<string, object> = new Map<string, object>();


    public put(key: string, value: object): void {
        this.map.set(key, value);
    }

    public getAction(key: string): object {
        const clazz: any = actionMappingBox.getAction(key);
        let action: any = null;
        if (clazz) {
            action = this.appContext.getObjectByClass(clazz);
        }
        return action;
    }

    public invokeAction(key: string, data: any, notFound: (d: any) => void): void {
        const action: any = this.getAction(key);
        const methodKey: string = actionMappingBox.getMethod(key);
        if (action && methodKey) {
            action[methodKey](data);
        } else {
            if (typeof (notFound) === 'function') {
                notFound(data);
            }
        }
    }
}

export default ActionBox;
