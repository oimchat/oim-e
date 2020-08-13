import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import GroupChatItemService from '@/app/com/main/module/business/chat/service/GroupChatItemService';

export default class GroupChatItemController extends AbstractMaterial {

    public showGroupChatItemById(groupId: string) {
        const groupChatItemService: GroupChatItemService = this.appContext.getMaterial(GroupChatItemService);
        groupChatItemService.showGroupChatItemById(groupId);
    }
}
