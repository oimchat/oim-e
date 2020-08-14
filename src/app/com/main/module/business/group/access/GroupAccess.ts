import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import DataChange from '@/app/base/event/DataChange';
import Group from '@/app/com/main/module/business/group/bean/Group';
import GroupListener from '@/app/com/main/module/business/group/listener/GroupListener';
import GroupHandler from '@/app/com/main/module/business/group/handler/GroupHandler';

export default class GroupAccess extends AbstractMaterial {

    public addChangeEvent(e: DataChange<Group>) {
        const groupListener: GroupListener = this.appContext.getMaterial(GroupListener);
        groupListener.addChangeEvent(e);
    }

    public getGroupById(groupId: string, back: (success: boolean, message: string, group: Group) => void): void {
        const groupHandler: GroupHandler = this.appContext.getMaterial(GroupHandler);
        groupHandler.getGroupById(groupId, back);
    }
}
