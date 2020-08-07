import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import User from '@/app/com/main/module/business/user/bean/User';

export default class PersonalBox extends AbstractMaterial {

    private user: User = new User();

    public getUser(): User {
        return this.user;
    }

    public setUser(user: User): void {
        this.user = user;
    }

    public getUserId(): string {
        let userId: string = '';
        if (this.user) {
            userId = this.user.id;
        }
        return userId;
    }
}
