import AbstractMaterial from '@/app/base/AbstractMaterial';
import serverClient from '@/app/com/main/http/api/ServerClient';
import ServerData from '@/app/com/data/ServerData';
import ServerBox from '@/app/com/main/box/ServerBox';
import ServerAddress from '@/app/com/bean/ServerAddress';
import DataBackAction from '@/app/base/net/DataBackAction';
import User from '@/app/com/bean/User';
import AbstractDataBackAction from '@/app/base/net/AbstractDataBackAction';
import UserSender from '@/app/com/main/sender/UserSender';
import ContactListManager from '@/app/com/main/manager/ContactListManager';

export default class UserService extends AbstractMaterial {

    public updateUserById(userId: string): void {
        if (userId) {
            const own = this;
            const back: DataBackAction = {
                back(data: any): void {
                    if (data && data.body) {
                        const user: User = data.body.user;
                        if (user) {
                            own.updateUser(user);
                        }
                    }
                },
            } as AbstractDataBackAction;
            const userSender: UserSender = this.appContext.getMaterial(UserSender);
            userSender.getUser(userId, back);
        }
    }

    public updateUser(user: User): void {
        if (user) {
            const ccm: ContactListManager = this.appContext.getMaterial(ContactListManager);
            ccm.addOrUpdateUser(user);
        }
    }
}
