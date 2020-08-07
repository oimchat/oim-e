import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import User from '@/app/com/main/module/business/user/bean/User';
import AbstractDataBackAction from '@/app/base/net/AbstractDataBackAction';
import UserSender from '@/app/com/main/module/business/user/sender/UserSender';
import UserBox from '@/app/com/main/module/business/user/box/UserBox';

export default class UserHandler extends AbstractMaterial {

    public getUserById(userId: string, back: (success: boolean, user?: User) => void): void {
        const user: User = this.getLocalUserById(userId);
        if (user) {
            back(true, user);
        } else {
            this.getUserFromServerById(userId, back);
        }
    }

    public getLocalUserById(userId: string): User {
        const userBox: UserBox = this.appContext.getMaterial(UserBox);
        return userBox.getUser(userId);
    }

    public getUserFromServerById(userId: string, back: (success: boolean, user?: User) => void): void {
        if (userId) {
            const own = this;
            const dataBack: DataBackAction = {
                back(data: any): void {
                    let mark = false;
                    let user: User | any;
                    if (data && data.body) {
                        user = data.body;
                        if (user) {
                            mark = true;
                        }
                    }
                    back(mark, user);
                },
                timeOut(data: any): void {
                    back(false);
                },
                lost(data: any): void {
                    back(false);
                },
            } as AbstractDataBackAction;
            const userSender: UserSender = this.appContext.getMaterial(UserSender);
            userSender.getUser(userId, dataBack);
        } else {
            back(false);
        }
    }
}
