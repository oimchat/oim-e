import AbstractMaterial from '@/app/base/AbstractMaterial';
import GroupChatItemService from '@/app/com/main/service/GroupChatItemService';

export default class GroupChatItemController extends AbstractMaterial {

    public showGroupChatItemById(userId: string) {
        const groupChatItemService: GroupChatItemService = this.appContext.getMaterial(GroupChatItemService);
        groupChatItemService.showGroupChatItemById(userId);
    }
}
