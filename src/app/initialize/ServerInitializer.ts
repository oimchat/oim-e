import Initializer from '@/app/base/initialize/Initializer';
import AppContext from '@/app/base/context/AppContext';
import LoginController from '@/app/com/main/module/business/index/controller/LoginController';


export default class ServerInitializer implements Initializer {
    public getOrder(): number {
        return 0;
    }

    public initialize(appContext: AppContext): void {
        this.initializeHandle(appContext);
    }

    public getKey(): string {
        const own: object = this;
        return own.constructor.name;
    }

    public initializeHandle(appContext: AppContext) {
        const lc: LoginController = appContext.getMaterial(LoginController);
        lc.initializeServerAddress();
    }
}
