// 导入元数据支持
import 'reflect-metadata';
import AbstractMaterial from './AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import ActionType from '@/app/base/ActionType';
import PromptHandler from '@/app/com/client/define/prompt/PromptHandler';
import ViewType from '@/app/base/view/ViewType';
import View from '@/app/com/client/common/view/View';
import DataPrompt from '@/app/base/DataPrompt';
import ObjectFactory from '@/app/base/context/ObjectFactory';
import {MaterialType} from '@/app/base/context/MaterialType';
import NetModule from '@/app/com/common/module/NetModule';
import Prompter from '@/app/com/client/component/Prompter';


// type MaterialType<T extends AbstractMaterial> = new(appContext: AppContext) => T;

class AppContext {

    public objectFactory: ObjectFactory = new ObjectFactory(this);
    private viewTypeMap: Map<any, any> = new Map<any, any>();
    private viewObjectMap: Map<any, any> = new Map<any, any>();

    constructor() {
        this.initialize();
    }

    public getMaterial<T extends AbstractMaterial>(clazz: MaterialType<T>): T {
        return this.objectFactory.getSingleMaterial(clazz);
    }

    public getObjectByClass<T>(clazz: new (...args: any[]) => T): T {
        return this.objectFactory.getSingleObjectByClass(clazz);
    }

    public getObjectByKey<T>(key: any): T {
        return this.objectFactory.getObjectByKey(key);
    }

    public putObject(key: any, value: any): void {
        this.objectFactory.putObject(key, value);
    }


    public putViewImpl(view: any, viewImpl: ViewType<AbstractMaterial>): void {
        this.viewTypeMap.set(view, viewImpl);
    }

    public putViewObject(view: any, value: View): void {
        this.viewObjectMap.set(view, value);
    }

    public getView<T>(key: any): T {
        let view = this.viewObjectMap.get(key);
        if (!view) {
            const impl = this.viewTypeMap.get(key);
            if (impl) {
                view = this.getObjectByClass(impl);
            }
        }
        return view;
    }

    public createDataBackAction(back: (data: any) => void): DataBackAction {
        const own = this;
        const prompter: Prompter = this.getMaterial(Prompter);
        const dataBack: DataBackAction = {
            back(value: any): void {
                if (typeof (back) === 'function') {
                    back(value);
                }
            },

            lost(data: any): void {
                prompter.prompt('请求失败!', undefined, 'warn');
            },

            timeOut(data: any): void {
                prompter.prompt('请求超时!', undefined, 'warn');
            },
        } as DataBackAction;
        return dataBack;
    }

    private initialize(): void {
        // TODO
    }
}

export default AppContext;
