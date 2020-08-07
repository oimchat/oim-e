import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import User from '@/app/com/main/module/business/user/bean/User';
import AbstractDataBackAction from '@/app/base/net/AbstractDataBackAction';
import UserSender from '@/app/com/main/module/business/user/sender/UserSender';
import ContactListManager from '@/app/com/main/module/business/contact/manager/ContactListManager';
import UserChatItemManager from '@/app/com/main/module/business/chat/manager/UserChatItemManager';
import UserBox from '@/app/com/main/module/business/user/box/UserBox';
import UserListener from '@/app/com/main/module/business/user/listener/UserListener';
import ObjectUtil from '@/app/common/util/ObjectUtil';

export default class UserService extends AbstractMaterial {

    public updateUserById(userId: string): void {
        if (userId) {
            const own = this;
            const back: DataBackAction = {
                back(data: any): void {
                    if (data && data.body) {
                        const value = data.body;
                        if (value) {
                            const user: User = ObjectUtil.convert(User, value);
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

            const userBox: UserBox = this.appContext.getMaterial(UserBox);
            userBox.putUser(user);

            const userListener: UserListener = this.appContext.getMaterial(UserListener);
            userListener.handleChangeEvent(user);

            const ccm: ContactListManager = this.appContext.getMaterial(ContactListManager);
            ccm.addOrUpdateUser(user);

            const userChatItemManager: UserChatItemManager = this.appContext.getMaterial(UserChatItemManager);
            const id = user.id;

            if (userChatItemManager.hasItem(id)) {
                userChatItemManager.addOrUpdateChatItemById(id);
            }
        }
    }
}
