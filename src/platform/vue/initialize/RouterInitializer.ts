import Initializer from '@/app/base/initialize/Initializer';
import AppContext from '@/app/base/context/AppContext';
import routerManager from '@/router/RouterManager';
import auth from '@/app/common/auth/Auth';

export default class RouterInitializer implements Initializer {

    public getOrder(): number {
        return 0;
    }

    public initialize(appContext: AppContext): void {
        this.initializeHttp(appContext);
    }

    public initializeHttp(appContext: AppContext) {
        routerManager.setRouterAuth({
            isAuth(): boolean {
                return auth.isLogin();
            },
        });
        routerManager.setDefaultRouteName('login');
        routerManager.setSkips(['login']);
        routerManager.setIntercept(true);
    }
}
