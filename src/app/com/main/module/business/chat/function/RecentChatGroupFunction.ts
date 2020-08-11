import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import Group from '@/app/com/main/module/business/group/bean/Group';
import Content from '@/app/com/common/chat/Content';
import PersonalBox from '@/app/com/main/module/business/personal/box/PersonalBox';
import GroupChatItemManager from '@/app/com/main/module/business/chat/manager/GroupChatItemManager';
import GroupChatInfoManager from '@/app/com/main/module/business/chat/manager/GroupChatInfoManager';
import User from '@/app/com/main/module/business/user/bean/User';
import CoreContentUtil from '@/app/com/common/chat/util/CoreContentUtil';
import UserBox from '@/app/com/main/module/business/user/box/UserBox';
import GroupChatData from '@/app/com/main/module/business/chat/data/GroupChatData';
import GroupBox from '@/app/com/main/module/business/group/box/GroupBox';

export default class RecentChatGroupFunction extends AbstractMaterial {


    public setRecentChatList(list: GroupChatData[]) {
        if (list) {
            const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);
            const ownUserId = pb.getUserId();
            const isReceive = true;

            const groupChatInfoManager: GroupChatInfoManager = this.appContext.getMaterial(GroupChatInfoManager);
            const groupChatItemManager: GroupChatItemManager = this.appContext.getMaterial(GroupChatItemManager);
            const userBox: UserBox = this.appContext.getMaterial(UserBox);
            const groupBox: GroupBox = this.appContext.getMaterial(GroupBox);

            for (const data of list) {


                // const messageKey: string = data.messageKey;
                // const contentId: string = data.contentId;
                const content: Content = data.content;
                let group: Group = data.group;
                const user: User = data.user;

                const groupId = (group) ? group.id : '';
                const key = groupId;

                group = groupBox.getGroup(groupId);

                groupChatItemManager.addOrUpdate(group);
                const timestamp = content.timestamp;
                const showTime = CoreContentUtil.getChatShowTime(content.timestamp);
                const text = CoreContentUtil.getText(content);

                groupChatItemManager.updateItemText(key, text, showTime, timestamp);
            }
        }
    }
}
