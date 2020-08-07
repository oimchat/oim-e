import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import GroupChatInfoService from '@/app/com/main/module/business/chat/service/GroupChatInfoService';

export default class GroupChatInfoController extends AbstractMaterial {

    public showGroupChatById(userId: string) {
        const userChatService: GroupChatInfoService = this.appContext.getMaterial(GroupChatInfoService);
        userChatService.showGroupChatById(userId);
    }
}
