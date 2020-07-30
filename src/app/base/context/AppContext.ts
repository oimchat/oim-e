// 导入元数据支持
import 'reflect-metadata';
import AbstractMaterial from './AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import ActionType from '@/app/base/ActionType';
import PromptHandler from '@/app/define/prompt/PromptHandler';
import ViewType from '@/app/base/view/ViewType';
import View from '@/app/com/main/view/View';
import DataPrompt from '@/app/base/DataPrompt';
import ObjectFactory from '@/app/base/context/ObjectFactory';
import {MaterialType} from '@/app/base/context/MaterialType';
import NetModule from '@/app/com/common/module/NetModule';
import Prompter from '@/app/com/main/component/Prompter';


// type MaterialType<T extends AbstractMaterial> = new(appContext: AppContext) => T;

class AppContext {

    public objectFactory: ObjectFactory = new ObjectFactory(this);

    constructor() {
        this.initialize();
        this.initializeNetServer();
    }

    public getObjectByClass<T>(clazz: new (...args: any[]) => T): T {
        return this.objectFactory.getSingleObjectByClass(clazz);
    }

    public getMaterial<T extends AbstractMaterial>(clazz: MaterialType<T>): T {
        return this.objectFactory.getSingleMaterial(clazz);
    }

    public getObject<T>(key: any): T {
        return this.objectFactory.getObjectByKey(key);
    }

    public getView<T>(key: any): T {
        return this.objectFactory.getObjectByKey(key);
    }

    public putView(view: any, viewImpl: ViewType<AbstractMaterial>): void {
        this.objectFactory.putInstanceClass(view, viewImpl);
    }

    public putViewObject(view: any, value: View): void {
        this.putObject(view, value);
    }

    public putObject(key: any, value: any): void {
        this.objectFactory.putObject(key, value);
    }


    public putAction<T>(clazz: ActionType<AbstractMaterial>): void {
        // new clazz(this);
    }

    public connect(socketHost: string, onOpen?: () => void): boolean {
        const netModule: NetModule = this.getMaterial(NetModule);
        const mark: boolean = netModule.netServer.connect(socketHost, onOpen);
        netModule.netServer.setSocketHost(socketHost);
        return mark;
    }


    public send(data: any, back?: DataBackAction, parallel?: boolean) {
        const netModule: NetModule = this.getMaterial(NetModule);
        netModule.netServer.send(data, back, parallel);
    }

    public prompt(message: string, title?: string, type?: string) {
        const prompter: Prompter = this.getMaterial(Prompter);
        prompter.prompt(message, title, type);
    }

    public promptData(data: any) {
        const own = this;
        if (data.info) {
            const prompter: Prompter = this.getMaterial(Prompter);
            prompter.message(data.info, '', '');
        }
        // own.dataPrompt.prompt(data);
    }


    public createDataBackAction(back: (data: any) => void): DataBackAction {
        const own = this;
        const dataBack: DataBackAction = {
            back(value: any): void {
                if (typeof (back) === 'function') {
                    back(value);
                }
            },

            lost(data: any): void {
                own.prompt('请求失败!', undefined, 'warn');
            },

            timeOut(data: any): void {
                own.prompt('请求超时!', undefined, 'warn');
            },
        } as DataBackAction;
        return dataBack;
    }

    private initialize(): void {
        // TODO
    }

    private initializeNetServer(): void {
        const netModule: NetModule = this.getMaterial(NetModule);
        netModule.initializeNetServer();
    }
}

export default AppContext;
