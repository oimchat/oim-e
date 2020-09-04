import LaunchInitializer from '@/app/base/initialize/LaunchInitializer';
import AppContext from '@/app/base/context/AppContext';
import LoginController from '@/app/com/main/module/business/index/controller/LoginController';


export default class ServerInitializer extends LaunchInitializer {

    public getOrder(): number {
        return 0;
    }

    public initialize(): void {
        this.initializeHandle(this.appContext);
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
