import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import Group from '@/app/com/main/module/business/group/bean/Group';
import GroupChatInfoManager from '@/app/com/main/module/business/chat/manager/GroupChatInfoManager';
import GroupChatItemManager from '@/app/com/main/module/business/chat/manager/GroupChatItemManager';
import GroupMessageUnreadBox from '@/app/com/main/module/business/chat/box/unread/GroupMessageUnreadBox';
import AllMessageUnreadBox from '@/app/com/client/module/information/box/unread/AllMessageUnreadBox';
import MessageAllUnreadManager from '@/app/com/main/manager/MessageAllUnreadManager';
import GroupChatManager from '@/app/com/main/module/business/chat/manager/GroupChatManager';


export default class GroupChatInfoService extends AbstractMaterial {

    public showGroupChatById(groupId: string) {
        const groupChatInfoManager: GroupChatInfoManager = this.appContext.getMaterial(GroupChatInfoManager);
        groupChatInfoManager.showGroupChatById(groupId);

        const groupChatManager: GroupChatManager = this.appContext.getMaterial(GroupChatManager);
        const groupChatItemManager: GroupChatItemManager = this.appContext.getMaterial(GroupChatItemManager);
        const groupMessageUnreadBox: GroupMessageUnreadBox = this.appContext.getMaterial(GroupMessageUnreadBox);

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

        groupMessageUnreadBox.setUnreadCount(groupId, 0);
        groupChatItemManager.setItemRed(groupId, false, 0);

        groupChatManager.firstLoadHistory(groupId, '', 10);
    }
}
