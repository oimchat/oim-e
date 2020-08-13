import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import Group from '@/app/com/main/module/business/group/bean/Group';

import DataBackAction from '@/app/base/net/DataBackAction';
import AbstractDataBackAction from '@/app/base/net/AbstractDataBackAction';
import GroupInfoSender from '@/app/com/main/module/business/group/sender/GroupInfoSender';
import GroupListManager from '@/app/com/main/module/business/group/manager/GroupListManager';
import GroupListener from '@/app/com/main/module/business/group/listener/GroupListener';
import GroupChatItemManager from '@/app/com/main/module/business/chat/manager/GroupChatItemManager';
import GroupBox from '@/app/com/main/module/business/group/box/GroupBox';
import GroupChatInfoManager from '@/app/com/main/module/business/chat/manager/GroupChatInfoManager';

export default class GroupInfoService extends AbstractMaterial {

    public updateById(groupId: string): void {
        if (groupId) {
            const own = this;
            const back: DataBackAction = {
                back(data: any): void {
                    if (data && data.body) {
                        const group: Group = data.body.group;
                        if (group) {
                            own.updateGroup(group);
                        }
                    }
                },
            } as AbstractDataBackAction;
            const groupSender: GroupInfoSender = this.appContext.getMaterial(GroupInfoSender);
            groupSender.getGroup(groupId, back);
        }
    }

    public updateGroup(group: Group): void {
        if (group) {

            const groupId = group.id;

            const groupBox: GroupBox = this.appContext.getMaterial(GroupBox);
            groupBox.putGroup(group);

            const listener: GroupListener = this.appContext.getMaterial(GroupListener);
            listener.handleChangeEvent(group);

            const ccm: GroupListManager = this.appContext.getMaterial(GroupListManager);
            ccm.addOrUpdateGroup(group);

            const groupChatItemManager: GroupChatItemManager = this.appContext.getMaterial(GroupChatItemManager);
            if (groupChatItemManager.hasItem(groupId)) {
                groupChatItemManager.addOrUpdate(group);
            }

            const groupChatInfoManager: GroupChatInfoManager = this.appContext.getMaterial(GroupChatInfoManager);
            if (groupChatInfoManager.isChatShowing(groupId)) {
                groupChatInfoManager.updateInfo(group);
            }
        }
    }
}
