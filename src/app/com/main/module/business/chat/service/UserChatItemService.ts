import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import User from '@/app/com/main/module/business/user/bean/User';
import UserChatItemManager from '@/app/com/main/module/business/chat/manager/UserChatItemManager';

export default class UserChatItemService extends AbstractMaterial {

    public showUserChatItemById(userId: string) {
        const userChatItemManager: UserChatItemManager = this.appContext.getMaterial(UserChatItemManager);
        userChatItemManager.showUserChatItemById(userId);
    }

    public showUserChatItem(user: User) {
        this.addOrUpdateChatItem(user);
        this.selectItem(user.id);
    }

    public addOrUpdateChatItemById(userId: string) {
        const userChatItemManager: UserChatItemManager = this.appContext.getMaterial(UserChatItemManager);
        userChatItemManager.addOrUpdateChatItemById(userId);
    }

    public addOrUpdateChatItem(user: User) {
        const userChatItemManager: UserChatItemManager = this.appContext.getMaterial(UserChatItemManager);
        userChatItemManager.addOrUpdate(user);
    }

    public selectItem(userId: string) {
        const userChatItemManager: UserChatItemManager = this.appContext.getMaterial(UserChatItemManager);
        userChatItemManager.selectItem(userId);
    }

    public deleteUserChatItemById(userId: string) {
        const userChatItemManager: UserChatItemManager = this.appContext.getMaterial(UserChatItemManager);
        userChatItemManager.deleteItem(userId);
    }
}
