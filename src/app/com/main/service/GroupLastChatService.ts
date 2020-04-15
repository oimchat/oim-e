import AbstractMaterial from '@/app/base/AbstractMaterial';
import Group from '@/app/com/bean/Group';
import Content from '@/app/com/data/chat/content/Content';
import PersonalBox from '@/app/com/main/box/PersonalBox';
import DataBackAction from '@/app/base/net/DataBackAction';
import AbstractDataBackAction from '@/app/base/net/AbstractDataBackAction';
import LastChatGroup from '@/app/com/data/chat/LastChatGroup';
import GroupChatSender from '@/app/com/main/sender/GroupChatSender';
import GroupChatItemManager from '@/app/com/main/manager/GroupChatItemManager';
import GroupChatInfoManager from '@/app/com/main/manager/GroupChatInfoManager';
import User from '@/app/com/bean/User';
import CoreContentUtil from '@/app/com/main/util/CoreContentUtil';
import UserBox from '@/app/com/main/box/UserBox';

export default class GroupLastChatService extends AbstractMaterial {

    public loadLastChatWithContentList(count: number) {

        const own = this;
        const groupChatSender: GroupChatSender = this.appContext.getMaterial(GroupChatSender);

        const dataBack: DataBackAction = {
            back(data: any): void {
                if (data && data.body) {
                    const list = data.body.items;
                    own.setLastChatGroupList(list);
                }
            },
            timeOut(data: any): void {
                // no
            },
            lost(data: any): void {
                // no
            },
        } as AbstractDataBackAction;

        groupChatSender.getLastChatWithContentList(10, dataBack);
    }

    private setLastChatGroupList(list: LastChatGroup[]) {
        if (list) {
            const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);
            const ownUserId = pb.getUserId();
            const isReceive = true;

            const groupChatInfoManager: GroupChatInfoManager = this.appContext.getMaterial(GroupChatInfoManager);
            const groupChatItemManager: GroupChatItemManager = this.appContext.getMaterial(GroupChatItemManager);
            const userBox: UserBox = this.appContext.getMaterial(UserBox);

            for (const data of list) {
                const messageKey: string = data.messageKey;
                const contentId: string = data.contentId;
                const content: Content = data.content;
                const group: Group = data.group;
                const user: User = data.user;

                const key = group.id;

                groupChatItemManager.addOrUpdate(group);

                const showTime = CoreContentUtil.getChatShowTime(content.timestamp);
                const text = CoreContentUtil.getText(content);

                groupChatItemManager.updateItemText(key, text, showTime);
            }
        }
    }
}
