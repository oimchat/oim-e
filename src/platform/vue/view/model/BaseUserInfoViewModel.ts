import User from '@/app/com/bean/User';


class BaseUserInfoViewModel {

    public userId: string = '';
    public user: User = new User();
    public hasUser: boolean = false;


    public initialize() {
        this.hasUser = false;
    }

    public setUser(user: User) {
        if (user) {
            this.user = user;
            this.hasUser = true;
        } else {
            this.hasUser = false;
            this.user = new User();
        }
    }
}

export default BaseUserInfoViewModel;
