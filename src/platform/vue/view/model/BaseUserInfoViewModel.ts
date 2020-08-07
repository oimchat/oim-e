import User from '@/app/com/main/module/business/user/bean/User';


class BaseUserInfoViewModel {

    public userId: string = '';
    public user: User = new User();
    public hasUser: boolean = false;


    public initialize() {
        this.hasUser = false;
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

export default BaseUserInfoViewModel;
