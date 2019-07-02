import AbstractMaterial from '@/app/base/AbstractMaterial';
import Group from '@/app/com/bean/Group';
import GroupListManager from '@/app/com/main/manager/GroupListManager';
import DataBackAction from '@/app/base/net/DataBackAction';

import AbstractDataBackAction from '@/app/base/net/AbstractDataBackAction';
import GroupInfoSender from '@/app/com/main/sender/GroupInfoSender';
import GroupChatItemManager from '@/app/com/main/manager/GroupChatItemManager';


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
                        const group: Group = data.body.group;
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
}
