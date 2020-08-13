import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import UserChatItemService from '@/app/com/main/module/business/chat/service/UserChatItemService';


export default class UserChatItemController extends AbstractMaterial {

    public showUserChatItemById(userId: string) {
        const userChatItemService: UserChatItemService = this.appContext.getMaterial(UserChatItemService);
        userChatItemService.showUserChatItemById(userId);
    }
}
