import AbstractMaterial from '@/app/base/AbstractMaterial';
import UserSender from '@/app/com/main/sender/UserSender';
import UserQuery from '@/app/com/data/UserQuery';
import Page from '@/app/com/data/common/Page';
import DataBackAction from '@/app/base/net/DataBackAction';
import UserChatItemService from '@/app/com/main/service/UserChatItemService';
import UserChatInfoService from '@/app/com/main/service/UserChatInfoService';
import UserChatItemEvent from '@/app/com/main/function/UserChatItemEvent';


export default class UserChatItemController extends AbstractMaterial {

    public showUserChatItemById(userId: string) {
        const userChatItemService: UserChatItemService = this.appContext.getMaterial(UserChatItemService);
        userChatItemService.showUserChatItemById(userId);
    }
}
