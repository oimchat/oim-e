import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import UserChatInfoService from '@/app/com/main/module/business/chat/service/UserChatInfoService';

export default class UserChatInfoController extends AbstractMaterial {

    public showUserChatById(userId: string) {
        const userChatService: UserChatInfoService = this.appContext.getMaterial(UserChatInfoService);
        userChatService.showUserChatById(userId);
    }
}
