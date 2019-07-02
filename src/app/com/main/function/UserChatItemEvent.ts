import AbstractMaterial from '@/app/base/AbstractMaterial';
import UserChatInfoManager from '@/app/com/main/manager/UserChatInfoManager';
import UserChatItemManager from '@/app/com/main/manager/UserChatItemManager';
import UserChatInfoService from '@/app/com/main/service/UserChatInfoService';

export default class UserChatItemEvent extends AbstractMaterial {

    public onSelect(key: string): void {
        const userChatInfoService: UserChatInfoService = this.appContext.getMaterial(UserChatInfoService);
        userChatInfoService.showUserChatById(key);
    }

    public onDelete(key: string): void {
        const userChatInfoManager: UserChatInfoManager = this.appContext.getMaterial(UserChatInfoManager);
        const userChatItemManager: UserChatItemManager = this.appContext.getMaterial(UserChatItemManager);
        userChatItemManager.deleteItem(key);
    }
}
