import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import Group from '@/app/com/main/module/business/group/bean/Group';
import ViewEnum from '@/app/com/client/common/view/ViewEnum';
import MessageListView from '@/app/com/client/module/message/view/MessageListView';
import GroupRelation from '@/app/com/main/module/business/group/bean/GroupRelation';
import BaseUtil from '@/app/lib/util/BaseUtil';
import GroupInfoUtil from '@/app/com/main/common/util/GroupInfoUtil';
import GroupRelationBox from '@/app/com/main/module/business/group/box/GroupRelationBox';
import GroupBox from '@/app/com/main/module/business/group/box/GroupBox';
import GroupChatItemEvent from '@/app/com/main/module/common/event/GroupChatItemEvent';

export default class GroupChatItemManager extends AbstractMaterial {
    private type = 'group_chat';

    public showGroupChatItemById(groupId: string) {
        this.addOrUpdateChatItemById(groupId);
        this.selectItem(groupId);
    }

    public showGroupChatItem(group: Group) {
        this.addOrUpdate(group);
        this.selectItem(group.id);
    }

    public addOrUpdateChatItemById(groupId: string) {
        const groupBox: GroupBox = this.appContext.getMaterial(GroupBox);
        const group: Group = groupBox.getGroup(groupId);
        if (group) {
            this.addOrUpdate(group);
        }
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

            const messageListView: MessageListView = this.appContext.getView(ViewEnum.MessageListView);
            messageListView.addOrUpdateItem(this.type, groupId, name, avatar, gray, (key: string) => {
                groupChatItemEvent.onSelect(key);
            }, (key: string) => {
                groupChatItemEvent.onDelete(key);
            });
        }
    }

    public selectItem(groupId: string) {
        const messageListView: MessageListView = this.appContext.getView(ViewEnum.MessageListView);
        messageListView.selectItem(this.type, groupId);
    }

    public hasItem(groupId: string): boolean {
        const messageListView: MessageListView = this.appContext.getView(ViewEnum.MessageListView);
        return messageListView.hasItem(this.type, groupId);
    }

    public deleteItem(groupId: string) {
        const messageListView: MessageListView = this.appContext.getView(ViewEnum.MessageListView);
        messageListView.removeItem(this.type, groupId);
    }

    public updateItemText(groupId: string, text: string, timeText: string, timestamp: number): void {
        const messageListView: MessageListView = this.appContext.getView(ViewEnum.MessageListView);
        messageListView.updateItemText(this.type, groupId, text, timeText, timestamp);
    }

    public setItemRed(groupId: string, red: boolean, count: number): void {
        const messageListView: MessageListView = this.appContext.getView(ViewEnum.MessageListView);
        messageListView.setItemRed(this.type, groupId, red, count);
    }
}
