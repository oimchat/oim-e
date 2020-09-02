import app from '@/app/App';
import auth from '@/app/common/auth/Auth';

import LoginSaveBox from '@/app/com/main/module/business/index/box/login/LoginSaveBox';
import LoginController from '@/app/com/main/module/business/index/controller/LoginController';
import BaseUtil from '@/app/lib/util/BaseUtil';
import LoginSaveInfo from '@/app/com/main/module/business/index/box/login/LoginSaveInfo';
import LoginUser from '@/app/com/main/module/business/index/data/LoginUser';
import ObjectUtil from '@/app/common/util/ObjectUtil';


class LoginViewModel {

    public head: string = 'assets/general/common/logo/logo_128.png';
    public data: LoginUser = new LoginUser();
    public hasLogin: boolean = false;
    public isLoginSaveSupport: boolean = false;
    public onLogin: (success: boolean, message?: string) => void = (
        (success: boolean, message?: string) => {
            // no
        }
    );

    public initialize() {
        const isFirst: boolean = auth.isFirst;
        const isAuth: boolean = auth.isAuth();
        this.initializeData();
        if (isAuth) {
            this.handleReLogin();
        } else if (isFirst) {
            this.handleAutoLogin();
        }
    }

    public handleAutoLogin() {
        const loginSaveBox: LoginSaveBox = app.appContext.getMaterial(LoginSaveBox);
        const array: LoginSaveInfo[] = loginSaveBox.getList();
        for (const data of array) {
            const onLogin = this.onLogin;
            const autoLogin: boolean = data.autoLogin;
            if (autoLogin) {
                ObjectUtil.copyByTargetKey(this.data, data);
                this.login(
                    () => {
                        return true;
                    },
                    onLogin,
                );
                break;
            }
        }
    }

    public initializeData() {
        const loginSaveBox: LoginSaveBox = app.appContext.getMaterial(LoginSaveBox);
        if (loginSaveBox.has()) {
            const loginUser: LoginSaveInfo = loginSaveBox.getFirst();
            if (loginUser) {
                // this.data.account = loginUser.account;
                // this.data.password = loginUser.password;
                ObjectUtil.copyByTargetKey(this.data, loginUser);
            }
        }
        this.isLoginSaveSupport = loginSaveBox.loginSaveSupport;
    }

    public handleReLogin() {
        const loginSaveBox: LoginSaveBox = app.appContext.getMaterial(LoginSaveBox);
        const account = auth.getAccount();
        const map: Map<string, LoginSaveInfo> = loginSaveBox.getLoginSaveInfoMap();
        const data = map.get(account);
        if (data) {
            const onLogin = this.onLogin;
            ObjectUtil.copyByTargetKey(this.data, data);
            this.login(
                () => {
                    return true;
                },
                onLogin,
            );
        }
    }

    public savePasswordChange(): void {
        if (!this.data.savePassword) {
            this.data.autoLogin = false;
        }
    }

    public autoLoginChange(): void {
        if (this.data.autoLogin) {
            this.data.savePassword = true;
        }
    }

    public login(
        validate: () => boolean,
        onBack: (success: boolean, message?: string) => void): void {
        const own = this;
        const valid = validate();
        if (valid) {
            const account: string = own.data.account;
            const password: string = own.data.password;
            const hasAccount = !BaseUtil.isEmpty(account);
            const hasPassword = !BaseUtil.isEmpty(password);
            if (!hasAccount || !hasPassword) {
                return;
            }

            own.hasLogin = true;
            const back = (success: boolean, message?: string): void => {
                onBack(success, message);
                if (success) {
                    setTimeout(() => {
                        this.hasLogin = false;
                    }, 2000);
                } else {
                    this.hasLogin = false;
                }
            };
            const lc: LoginController = app.appContext.getMaterial(LoginController);
            const loginUser: LoginUser = own.data;
            lc.login(loginUser, back);
        }
    }
}

export default new LoginViewModel();
