import LoginSaveBox from '@/app/com/main/box/login/LoginSaveBox';
import LoginController from '@/app/com/main/controller/LoginController';
import BaseUtil from '@/app/lib/util/BaseUtil';
import app from '@/app/App';
import LoginSaveInfo from '@/app/com/main/box/login/LoginSaveInfo';
import LoginUser from '@/app/com/data/LoginUser';

class LoginViewModel {

    public head: string = '';
    public data: { account: string, password: string } = {account: '', password: ''};
    public hasLogin: boolean = false;

    public initialize() {
        this.initializeData();
    }

    public initializeData() {
        const loginSaveBox: LoginSaveBox = app.appContext.getMaterial(LoginSaveBox);
        if (loginSaveBox.has()) {
            const loginUser: LoginSaveInfo = loginSaveBox.getFirst();
            if (loginUser) {
                this.data.account = loginUser.account;
                this.data.password = loginUser.password;
            }
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
                    }, 5000);
                } else {
                    this.hasLogin = false;
                }
            };
            const lc: LoginController = app.appContext.getMaterial(LoginController);
            const loginUser: LoginUser = new LoginUser();
            loginUser.account = account;
            loginUser.password = password;
            lc.login(loginUser, back);
        }
    }
}

export default new LoginViewModel();
