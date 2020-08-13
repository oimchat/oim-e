import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import ContactListManager from '@/app/com/main/module/business/contact/manager/ContactListManager';
import User from '@/app/com/main/module/business/user/bean/User';
import DataBackAction from '@/app/base/net/DataBackAction';
import AbstractDataBackAction from '@/app/base/net/AbstractDataBackAction';
import UserSender from '@/app/com/main/module/business/user/sender/UserSender';
import ContactManager from '@/app/com/main/module/business/contact/manager/ContactManager';
import UserChatItemManager from '@/app/com/main/module/business/chat/manager/UserChatItemManager';

export default class ContactService extends AbstractMaterial {

    public setList(list: User[]): void {
        if (list) {
            const ccm: ContactListManager = this.appContext.getMaterial(ContactListManager);
            ccm.setUserList(list);

            const userChatItemManager: UserChatItemManager = this.appContext.getMaterial(UserChatItemManager);
            for (const data of list) {
                const id = data.id;

                if (userChatItemManager.hasItem(id)) {
                    userChatItemManager.addOrUpdate(data);
                }
            }
        }
    }

    public addByUserId(userId: string) {
        if (userId) {
            const own = this;
            const back: DataBackAction = {
                back(data: any): void {
                    if (data && data.body) {
                        const user: User = data.body;
                        if (user) {
                            own.add(user);
                        }
                    }
                },
            } as AbstractDataBackAction;
            const userSender: UserSender = this.appContext.getMaterial(UserSender);
            userSender.getUser(userId, back);
        }
    }

    public add(user: User): void {
        if (user) {
            const ccm: ContactListManager = this.appContext.getMaterial(ContactListManager);
            ccm.addOrUpdateUser(user);
        }
    }

    public getShowNameById(userId: string): string {
        const contactManager: ContactManager = this.appContext.getMaterial(ContactManager);
        return contactManager.getShowNameById(userId);
    }

    public getShowName(user: User): string {
        const contactManager: ContactManager = this.appContext.getMaterial(ContactManager);
        return contactManager.getShowName(user);
    }

    public loadUsers(userIds: string[]): void {
        if (userIds) {
            const own = this;
            const back: DataBackAction = {
                back(data: any): void {
                    if (data && data.body) {
                        const items: User[] = data.body.items;
                        if (items) {
                            own.setList(items);
                        }
                    }
                },
            } as AbstractDataBackAction;
            const userSender: UserSender = this.appContext.getMaterial(UserSender);
            userSender.getUsers(userIds, back, false);
        }
    }
}
