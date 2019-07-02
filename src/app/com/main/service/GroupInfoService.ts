import AbstractMaterial from '@/app/base/AbstractMaterial';
import Group from '@/app/com/bean/Group';

import DataBackAction from '@/app/base/net/DataBackAction';
import AbstractDataBackAction from '@/app/base/net/AbstractDataBackAction';
import GroupInfoSender from '@/app/com/main/sender/GroupInfoSender';
import GroupListManager from '@/app/com/main/manager/GroupListManager';

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
            const ccm: GroupListManager = this.appContext.getMaterial(GroupListManager);
            ccm.addOrUpdateGroup(group);
        }
    }
}
