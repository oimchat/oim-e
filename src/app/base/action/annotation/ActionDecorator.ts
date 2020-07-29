import actionMappingBox from '@/app/base/action/box/ActionMappingBox';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import ActionType from '@/app/base/ActionType';

export function ActionMapping(actionKey: string): ClassDecorator {
    return (target) => { //  这才是真正装饰器
        // do something
    };
}

export function MethodMapping(action: ActionType<AbstractMaterial>, actionKey: string, methodKey: string) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        actionMappingBox.put(actionKey, action, methodKey, propertyKey);
    };
}

export function Define(propertyKey: string) {
    return (target: any, methodName: string, paramIndex: number) => {
        // do something
    };
}
