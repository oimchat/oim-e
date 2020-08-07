import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import UserChatInfoManager from '@/app/com/main/module/business/chat/manager/UserChatInfoManager';
import UserChatItemManager from '@/app/com/main/module/business/chat/manager/UserChatItemManager';
import UserChatInfoService from '@/app/com/main/module/business/chat/service/UserChatInfoService';
import RecentChatSender from '@/app/com/main/module/business/chat/sender/RecentChatSender';
import PersonalBox from '@/app/com/main/module/business/personal/box/PersonalBox';
import RecentChat from '@/app/com/main/module/business/chat/bean/RecentChat';

export default class UserChatItemEvent extends AbstractMaterial {

    public onSelect(key: string): void {
        const userChatInfoService: UserChatInfoService = this.appContext.getMaterial(UserChatInfoService);
        userChatInfoService.showUserChatById(key);
    }

    public onDelete(key: string): void {
        const userChatInfoManager: UserChatInfoManager = this.appContext.getMaterial(UserChatInfoManager);
        const userChatItemManager: UserChatItemManager = this.appContext.getMaterial(UserChatItemManager);
        userChatItemManager.deleteItem(key);

        const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);
        const ownUserId = pb.getUserId();

        const recentChatSender: RecentChatSender = this.appContext.getMaterial(RecentChatSender);
        recentChatSender.remove(ownUserId, key, RecentChat.TYPE_USER);
    }
}
