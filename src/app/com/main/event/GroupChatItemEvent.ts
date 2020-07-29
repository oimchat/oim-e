import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import GroupChatInfoManager from '@/app/com/main/manager/GroupChatInfoManager';
import GroupChatItemManager from '@/app/com/main/manager/GroupChatItemManager';
import GroupChatInfoService from '@/app/com/main/service/GroupChatInfoService';
import GroupMember from '@/app/com/bean/GroupMember';
import GroupMemberListController from '@/app/com/main/controller/GroupMemberListController';
import PersonalBox from '@/app/com/main/box/PersonalBox';
import RecentChatSender from '@/app/com/main/sender/RecentChatSender';
import RecentChat from '@/app/com/bean/RecentChat';

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

        const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);
        const ownUserId = pb.getUserId();

        const recentChatSender: RecentChatSender = this.appContext.getMaterial(RecentChatSender);
        recentChatSender.remove(ownUserId, key, RecentChat.TYPE_GROUP);
    }
}
