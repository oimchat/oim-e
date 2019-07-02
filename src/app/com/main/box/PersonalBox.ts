import AbstractMaterial from '@/app/base/AbstractMaterial';
import ServerData from '@/app/com/data/ServerData';
import ServerAddress from '@/app/com/bean/ServerAddress';
import BaseUtil from '@/app/lib/util/BaseUtil';
import User from '@/app/com/bean/User';

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
