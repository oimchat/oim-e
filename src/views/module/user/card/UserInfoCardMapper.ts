import User from '@/app/com/main/module/business/user/bean/User';
import App from '@/app/App';
import UserInfoController from '@/app/com/main/module/business/user/controller/UserInfoController';

export default class UserInfoCardMapper {

    public userId: string = '';
    public user: User = new User();
    public hasUser: boolean = false;


    public initialize() {
        this.hasUser = false;
    }

    public loadById(userId: string) {
        const own = this;
        const userInfoController: UserInfoController = App.appContext.getMaterial(UserInfoController);
        userInfoController.getById(userId, (success, message, user) => {
            if (success) {
                own.setUser(user);
            } else {
                App.prompt(message);
            }
        });
    }

    public setUser(user: User) {
        if (user) {
            this.userId = user.id;
            this.user = user;
            this.hasUser = true;
        } else {
            this.hasUser = false;
            this.userId = '';
            this.user = new User();
        }
    }
}
