import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import GroupChatInfoManager from '@/app/com/main/module/business/chat/manager/GroupChatInfoManager';
import GroupChatItemManager from '@/app/com/main/module/business/chat/manager/GroupChatItemManager';
import GroupChatInfoService from '@/app/com/main/module/business/chat/service/GroupChatInfoService';
import GroupMember from '@/app/com/main/module/business/group/bean/GroupMember';
import GroupMemberListViewController from '@/app/com/main/module/business/group/controller/GroupMemberListViewController';
import PersonalBox from '@/app/com/main/module/business/personal/box/PersonalBox';
import RecentChatSender from '@/app/com/main/module/business/chat/sender/RecentChatSender';
import RecentChat from '@/app/com/main/module/business/chat/bean/RecentChat';

export default class GroupChatItemEvent extends AbstractMaterial {

    public onSelect(key: string): void {
        const groupChatInfoService: GroupChatInfoService = this.appContext.getMaterial(GroupChatInfoService);
        groupChatInfoService.showGroupChatById(key);
        const groupMemberListController: GroupMemberListViewController = this.appContext.getMaterial(GroupMemberListViewController);
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
