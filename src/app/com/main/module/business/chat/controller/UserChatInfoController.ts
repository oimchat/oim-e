import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import UserChatInfoService from '@/app/com/main/module/business/chat/service/UserChatInfoService';
import Content from '@/app/com/common/chat/Content';
import DataBackAction from '@/app/base/net/DataBackAction';
import UserChatSender from '@/app/com/main/module/business/chat/sender/UserChatSender';
import PersonalBox from '@/app/com/main/module/business/personal/box/PersonalBox';

export default class UserChatInfoController extends AbstractMaterial {

    public showUserChatById(userId: string) {
        const userChatService: UserChatInfoService = this.appContext.getMaterial(UserChatInfoService);
        userChatService.showUserChatById(userId);
    }
}
