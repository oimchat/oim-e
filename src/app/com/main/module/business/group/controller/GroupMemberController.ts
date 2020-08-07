import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import GroupMemberSender from '@/app/com/main/module/business/group/sender/GroupMemberSender';

export default class GroupMemberController extends AbstractMaterial {


    // public getGroupMemberList(groupId: string, back?: DataBackAction, parallel?: boolean): void {
    //     const sender: GroupMemberSender = this.appContext.getMaterial(GroupMemberSender);
    //     sender.getGroupMemberList(groupId, back, parallel);
    // }

    public getGroupMember(groupId: string, userId: string, back?: DataBackAction, parallel?: boolean): void {
        const sender: GroupMemberSender = this.appContext.getMaterial(GroupMemberSender);
        sender.getGroupMember(groupId, userId, back, parallel);
    }

    public updateNickname(groupId: string, userId: string, nickname: string, back?: DataBackAction, parallel?: boolean): void {
        const sender: GroupMemberSender = this.appContext.getMaterial(GroupMemberSender);
        sender.updateNickname(groupId, userId, nickname, back, parallel);
    }


    public updatePosition(groupId: string, userId: string, position: string, back?: DataBackAction, parallel?: boolean): void {
        const sender: GroupMemberSender = this.appContext.getMaterial(GroupMemberSender);
        sender.updatePosition(groupId, userId, position, back, parallel);
    }


    public delete(groupId: string, userId: string, back?: DataBackAction, parallel?: boolean): void {
        const sender: GroupMemberSender = this.appContext.getMaterial(GroupMemberSender);
        sender.delete(groupId, userId, back, parallel);
    }
}
