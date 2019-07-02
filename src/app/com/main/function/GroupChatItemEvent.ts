import AbstractMaterial from '@/app/base/AbstractMaterial';
import GroupChatInfoManager from '@/app/com/main/manager/GroupChatInfoManager';
import GroupChatItemManager from '@/app/com/main/manager/GroupChatItemManager';
import GroupChatInfoService from '@/app/com/main/service/GroupChatInfoService';
import GroupMember from '@/app/com/bean/GroupMember';
import GroupMemberListController from '@/app/com/main/controller/GroupMemberListController';

export default class GroupChatItemEvent extends AbstractMaterial {

    public onSelect(key: string): void {
        const groupChatInfoService: GroupChatInfoService = this.appContext.getMaterial(GroupChatInfoService);
        groupChatInfoService.showGroupChatById(key);
        const groupMemberListController: GroupMemberListController = this.appContext.getMaterial(GroupMemberListController);
        groupMemberListController.loadMemberListByGroupId(key);
    }

    public onDelete(key: string): void {
        const groupChatInfoManager: GroupChatInfoManager = this.appContext.getMaterial(GroupChatInfoManager);
        const groupChatItemManager: GroupChatItemManager = this.appContext.getMaterial(GroupChatItemManager);
        groupChatItemManager.deleteItem(key);
    }
}
