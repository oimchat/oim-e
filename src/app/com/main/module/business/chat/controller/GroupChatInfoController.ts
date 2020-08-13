import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import GroupChatInfoService from '@/app/com/main/module/business/chat/service/GroupChatInfoService';

export default class GroupChatInfoController extends AbstractMaterial {

    public showGroupChatById(groupId: string) {
        const groupChatInfoService: GroupChatInfoService = this.appContext.getMaterial(GroupChatInfoService);
        groupChatInfoService.showGroupChatById(groupId);
    }
}
