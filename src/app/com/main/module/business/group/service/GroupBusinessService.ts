import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import Group from '@/app/com/main/module/business/group/bean/Group';
import GroupListManager from '@/app/com/main/module/business/group/manager/GroupListManager';
import DataBackAction from '@/app/base/net/DataBackAction';

import AbstractDataBackAction from '@/app/base/net/AbstractDataBackAction';
import GroupInfoSender from '@/app/com/main/module/business/group/sender/GroupInfoSender';
import GroupChatItemManager from '@/app/com/main/module/business/chat/manager/GroupChatItemManager';


export default class GroupBusinessService extends AbstractMaterial {

    public setList(list: Group[]): void {
        if (list) {
            const ccm: GroupListManager = this.appContext.getMaterial(GroupListManager);
            ccm.setGroupList(list);

            const groupChatItemManager: GroupChatItemManager = this.appContext.getMaterial(GroupChatItemManager);
            for (const data of list) {
                const id = data.id;

                if (groupChatItemManager.hasItem(id)) {
                    groupChatItemManager.addOrUpdateChatItemById(id);
                }
            }
        }
    }

    public addByGroupId(groupId: string) {
        if (groupId) {
            const own = this;
            const back: DataBackAction = {
                back(data: any): void {
                    if (data && data.body) {
                        const group: Group = data.body;
                        if (group) {
                            own.add(group);
                        }
                    }
                },
            } as AbstractDataBackAction;
            const groupSender: GroupInfoSender = this.appContext.getMaterial(GroupInfoSender);
            groupSender.getGroup(groupId, back);
        }
    }

    public add(group: Group): void {
        if (group) {
            const ccm: GroupListManager = this.appContext.getMaterial(GroupListManager);
            ccm.addOrUpdateGroup(group);
        }
    }

    public loadGroups(groupIds: string[]) {
        if (groupIds) {
            const own = this;
            const back: DataBackAction = {
                back(data: any): void {
                    if (data && data.body) {
                        const items: Group[] = data.body.items;
                        if (items) {
                            own.setList(items);
                        }
                    }
                },
            } as AbstractDataBackAction;
            const groupSender: GroupInfoSender = this.appContext.getMaterial(GroupInfoSender);
            groupSender.getGroups(groupIds, back, false);
        }
    }
}
