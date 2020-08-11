import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import DataChange from '@/app/base/event/DataChange';
import Group from '@/app/com/main/module/business/group/bean/Group';
import GroupListener from '@/app/com/main/module/business/group/listener/GroupListener';
import GroupHandler from '@/app/com/main/module/business/group/handler/GroupHandler';
import GroupTempBox from '@/app/com/main/module/business/group/box/GroupTempBox';

export default class GroupAccess extends AbstractMaterial {

    public addChangeEvent(e: DataChange<Group>) {
        const groupListener: GroupListener = this.appContext.getMaterial(GroupListener);
        groupListener.addChangeEvent(e);
    }

    public getGroupById(groupId: string, back: (success: boolean, group: Group) => void): void {
        const groupHandler: GroupHandler = this.appContext.getMaterial(GroupHandler);
        groupHandler.getGroupById(groupId, back);
    }

    public getTempGroupById(groupId: string, back: (success: boolean, group: Group) => void): void {
        const groupHandler: GroupHandler = this.appContext.getMaterial(GroupHandler);
        const groupTempBox: GroupTempBox = this.appContext.getMaterial(GroupTempBox);
        const group: Group = groupTempBox.getGroup(groupId);
        if (group) {
            back(true, group);
        } else {
            groupHandler.getGroupFromServerById(groupId, (success, group) => {
                if (success && group) {
                    groupTempBox.keepSize(10000);
                    groupTempBox.putGroup(group);
                }
                back(success, group);
            });
        }
    }
}
