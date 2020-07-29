import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import UserChatInfoService from '@/app/com/main/service/UserChatInfoService';
import Content from '@/app/com/data/chat/content/Content';
import DataBackAction from '@/app/base/net/DataBackAction';
import UserChatSender from '@/app/com/main/sender/UserChatSender';
import PersonalBox from '@/app/com/main/box/PersonalBox';

export default class UserChatInfoController extends AbstractMaterial {

    public showUserChatById(userId: string) {
        const userChatService: UserChatInfoService = this.appContext.getMaterial(UserChatInfoService);
        userChatService.showUserChatById(userId);
    }
}
