import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import RecentChatService from '@/app/com/main/module/business/chat/service/RecentChatService';
import UserChatUnreadService from '@/app/com/main/module/business/chat/service/UserChatUnreadService';

export default class InitializeConverge extends AbstractMaterial {

    public loadLastList() {
        const recentChatService: RecentChatService = this.appContext.getMaterial(RecentChatService);
        recentChatService.loadListByCount(20);
    }

    public loadUnreadList() {
        const userChatUnreadService: UserChatUnreadService = this.appContext.getMaterial(UserChatUnreadService);
        userChatUnreadService.loadAllList();
    }
}
