import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import Group from '@/app/com/main/module/business/group/bean/Group';
import WorkViewEnum from '@/app/com/common/view/WorkViewEnum';
import MessageListView from '@/app/com/client/module/message/view/MessageListView';
import GroupRelation from '@/app/com/main/module/business/group/bean/GroupRelation';
import BaseUtil from '@/app/lib/util/BaseUtil';
import GroupInfoUtil from '@/app/com/main/common/util/GroupInfoUtil';
import GroupRelationBox from '@/app/com/main/module/business/group/box/GroupRelationBox';
import GroupBox from '@/app/com/main/module/business/group/box/GroupBox';
import GroupChatItemEvent from '@/app/com/main/module/common/event/GroupChatItemEvent';
import Prompter from '@/app/com/client/component/Prompter';
import UserAccess from '@/app/com/main/module/business/user/access/UserAccess';
import GroupAccess from '@/app/com/main/module/business/group/access/GroupAccess';
import GroupMessageUnreadBox from '@/app/com/main/module/business/chat/box/unread/GroupMessageUnreadBox';
import DataChange from '@/app/base/event/DataChange';
import AppContext from '@/app/base/context/AppContext';

export default class GroupChatItemManager extends AbstractMaterial {
    private type = 'group_chat';

    public constructor(protected appContext: AppContext) {
        super(appContext);
        const own = this;
        const c = {
            change(data: { key: string; unreadCount: number }): void {
                const red = data.unreadCount > 0;
                own.setItemRed(data.key, red, data.unreadCount);
            },
        } as DataChange<{ key: string, unreadCount: number }>;
        const groupMessageUnreadBox: GroupMessageUnreadBox = this.appContext.getMaterial(GroupMessageUnreadBox);
        groupMessageUnreadBox.addChangeEvent(c);
    }

    public showGroupChatItemById(groupId: string) {
        this.addOrUpdateChatItemById(groupId);
        this.selectItem(groupId);
    }

    public addOrUpdateChatItemById(groupId: string) {
        const own = this;
        const prompter: Prompter = this.appContext.getMaterial(Prompter);
        const groupAccess: GroupAccess = this.appContext.getMaterial(GroupAccess);
        groupAccess.getGroupById(groupId, (success, message: string, group) => {
            if (success) {
                own.addOrUpdate(group);
            } else {
                prompter.warn('加载群失败');
            }
        });
    }

    public showGroupChatItem(group: Group) {
        this.addOrUpdate(group);
        this.selectItem(group.id);
    }


    public addOrUpdate(group: Group) {
        if (group) {
            const groupListBox: GroupRelationBox = this.appContext.getMaterial(GroupRelationBox);
            const relation: GroupRelation = groupListBox.getGroupRelationByGroupId(group.id);
            this.addOrUpdateInfo(group, relation);
        }
    }

    public addOrUpdateInfo(group: Group, relation: GroupRelation) {
        if (group) {
            const groupId = group.id;
            let name = '';
            const avatar = GroupInfoUtil.getHeadImage(group);
            const gray = false;

            if (relation) {
                name = relation.remark;
            }

            if (BaseUtil.isEmpty(name)) {
                name = GroupInfoUtil.getShowName(group);
            }

            const groupChatItemEvent: GroupChatItemEvent = this.appContext.getMaterial(GroupChatItemEvent);

            const messageListView: MessageListView = this.appContext.getView(WorkViewEnum.MessageListView);
            messageListView.addOrUpdateItem(this.type, groupId, name, avatar, gray, group, (key: string) => {
                groupChatItemEvent.onSelect(key);
            }, (key: string) => {
                groupChatItemEvent.onDelete(key);
            });
        }
    }

    public selectItem(groupId: string) {
        const messageListView: MessageListView = this.appContext.getView(WorkViewEnum.MessageListView);
        messageListView.selectItem(this.type, groupId);
    }

    public hasItem(groupId: string): boolean {
        const messageListView: MessageListView = this.appContext.getView(WorkViewEnum.MessageListView);
        return messageListView.hasItem(this.type, groupId);
    }

    public deleteItem(groupId: string) {
        const messageListView: MessageListView = this.appContext.getView(WorkViewEnum.MessageListView);
        messageListView.removeItem(this.type, groupId);
    }

    public updateItemText(groupId: string, text: string, timeText: string, timestamp: number): void {
        const messageListView: MessageListView = this.appContext.getView(WorkViewEnum.MessageListView);
        messageListView.updateItemText(this.type, groupId, text, timeText, timestamp);
    }

    public setItemRed(groupId: string, red: boolean, count: number): void {
        const messageListView: MessageListView = this.appContext.getView(WorkViewEnum.MessageListView);
        messageListView.setItemRed(this.type, groupId, red, count);
    }
}
