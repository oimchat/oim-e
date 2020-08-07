import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import UserSender from '@/app/com/main/module/business/user/sender/UserSender';
import UserQuery from '@/app/com/main/module/business/user/data/UserQuery';
import Page from '@/app/com/common/data/Page';
import DataBackAction from '@/app/base/net/DataBackAction';
import UserChatItemService from '@/app/com/main/module/business/chat/service/UserChatItemService';
import UserChatInfoService from '@/app/com/main/module/business/chat/service/UserChatInfoService';
import UserChatItemEvent from '@/app/com/main/module/common/event/UserChatItemEvent';


export default class UserChatItemController extends AbstractMaterial {

    public showUserChatItemById(userId: string) {
        const userChatItemService: UserChatItemService = this.appContext.getMaterial(UserChatItemService);
        userChatItemService.showUserChatItemById(userId);
    }
}
