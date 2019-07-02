import AbstractMaterial from '@/app/base/AbstractMaterial';
import Group from '@/app/com/bean/Group';
import GroupChatInfoManager from '@/app/com/main/manager/GroupChatInfoManager';
import GroupChatItemManager from '@/app/com/main/manager/GroupChatItemManager';
import GroupMessageUnreadBox from '@/app/com/main/box/GroupMessageUnreadBox';
import AllMessageUnreadBox from '@/app/com/main/box/AllMessageUnreadBox';
import MessageAllUnreadManager from '@/app/com/main/manager/MessageAllUnreadManager';
import GroupChatManager from '@/app/com/main/manager/GroupChatManager';


export default class GroupChatInfoService extends AbstractMaterial {

    public showGroupChatById(groupId: string) {
        const groupChatInfoManager: GroupChatInfoManager = this.appContext.getMaterial(GroupChatInfoManager);
        groupChatInfoManager.showGroupChatById(groupId);

        const groupChatManager: GroupChatManager = this.appContext.getMaterial(GroupChatManager);
        const groupChatItemManager: GroupChatItemManager = this.appContext.getMaterial(GroupChatItemManager);
        const groupMessageUnreadBox: GroupMessageUnreadBox = this.appContext.getMaterial(GroupMessageUnreadBox);
        const allMessageUnreadBox: AllMessageUnreadBox = this.appContext.getMaterial(AllMessageUnreadBox);
        const messageAllUnreadManager: MessageAllUnreadManager = this.appContext.getMaterial(MessageAllUnreadManager);

        const unreadCount = groupMessageUnreadBox.getUnreadCount(groupId);
        allMessageUnreadBox.minusUnread(unreadCount);

        const totalUnreadCount = allMessageUnreadBox.getTotalUnreadCount();
        const totalRed = totalUnreadCount > 0;
        messageAllUnreadManager.setMessageItemRed(totalRed, totalUnreadCount);

        groupMessageUnreadBox.setUnreadCount(groupId, 0);
        groupChatItemManager.setItemRed(groupId, false, 0);

        groupChatManager.firstLoadHistory(groupId, '', 10);
    }

    public showGroupChat(group: Group) {
        const groupChatInfoManager: GroupChatInfoManager = this.appContext.getMaterial(GroupChatInfoManager);
        groupChatInfoManager.showGroupChat(group);

        const groupId = group.id;

        const groupChatManager: GroupChatManager = this.appContext.getMaterial(GroupChatManager);
        const groupChatItemManager: GroupChatItemManager = this.appContext.getMaterial(GroupChatItemManager);
        const groupMessageUnreadBox: GroupMessageUnreadBox = this.appContext.getMaterial(GroupMessageUnreadBox);
        const allMessageUnreadBox: AllMessageUnreadBox = this.appContext.getMaterial(AllMessageUnreadBox);
        const messageAllUnreadManager: MessageAllUnreadManager = this.appContext.getMaterial(MessageAllUnreadManager);

        const unreadCount = groupMessageUnreadBox.getUnreadCount(groupId);
        allMessageUnreadBox.minusUnread(unreadCount);

        const totalUnreadCount = allMessageUnreadBox.getTotalUnreadCount();
        const totalRed = totalUnreadCount > 0;
        messageAllUnreadManager.setMessageItemRed(totalRed, totalUnreadCount);

        groupMessageUnreadBox.setUnreadCount(groupId, 0);
        groupChatItemManager.setItemRed(groupId, false, 0);

        groupChatManager.firstLoadHistory(groupId, '', 10);
    }
}
