import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import GroupMessageUnreadBox from '@/app/com/main/module/business/chat/box/unread/GroupMessageUnreadBox';

export default class GroupChatOpenManager extends AbstractMaterial {

    public openGroupChatById(groupId: string) {
        const groupMessageUnreadBox: GroupMessageUnreadBox = this.appContext.getMaterial(GroupMessageUnreadBox);
        groupMessageUnreadBox.setUnreadCount(groupId, 0);
    }
}
