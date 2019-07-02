import AbstractMaterial from '@/app/base/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import GroupBusinessSender from '@/app/com/main/sender/GroupBusinessSender';

export default class GroupBusinessController extends AbstractMaterial {


    public getList(back?: DataBackAction, parallel?: boolean): void {
        const sender: GroupBusinessSender = this.appContext.getMaterial(GroupBusinessSender);
        sender.getList(back, parallel);
    }

    public changeGroupOwner(groupId: string, newOwnerUserId: string, back?: DataBackAction, parallel?: boolean): void {
        const sender: GroupBusinessSender = this.appContext.getMaterial(GroupBusinessSender);
        sender.changeGroupOwner(groupId, newOwnerUserId, back, parallel);
    }

    public quit(groupId: string, back?: DataBackAction, parallel?: boolean): void {
        const sender: GroupBusinessSender = this.appContext.getMaterial(GroupBusinessSender);
        sender.quit(groupId, back, parallel);
    }

    public disband(groupId: string, back?: DataBackAction, parallel?: boolean): void {
        const sender: GroupBusinessSender = this.appContext.getMaterial(GroupBusinessSender);
        sender.disband(groupId, back, parallel);
    }
}
