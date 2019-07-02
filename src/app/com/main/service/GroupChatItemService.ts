import AbstractMaterial from '@/app/base/AbstractMaterial';
import Group from '@/app/com/bean/Group';
import GroupChatItemManager from '@/app/com/main/manager/GroupChatItemManager';

export default class GroupChatItemService extends AbstractMaterial {

    public showGroupChatItemById(groupId: string) {
        const groupChatItemManager: GroupChatItemManager = this.appContext.getMaterial(GroupChatItemManager);
        groupChatItemManager.showGroupChatItemById(groupId);
    }

    public showGroupChatItem(group: Group) {
        this.addOrUpdateChatItem(group);
        this.selectItem(group.id);
    }

    public addOrUpdateChatItemById(groupId: string) {
        const groupChatItemManager: GroupChatItemManager = this.appContext.getMaterial(GroupChatItemManager);
        groupChatItemManager.addOrUpdateChatItemById(groupId);
    }

    public addOrUpdateChatItem(group: Group) {
        const groupChatItemManager: GroupChatItemManager = this.appContext.getMaterial(GroupChatItemManager);
        groupChatItemManager.addOrUpdate(group);
    }

    public selectItem(groupId: string) {
        const groupChatItemManager: GroupChatItemManager = this.appContext.getMaterial(GroupChatItemManager);
        groupChatItemManager.selectItem(groupId);
    }

    public deleteGroupChatItemById(groupId: string) {
        const groupChatItemManager: GroupChatItemManager = this.appContext.getMaterial(GroupChatItemManager);
        groupChatItemManager.deleteItem(groupId);
    }
}
