import {MethodMapping} from '@/app/base/action/annotation/ActionDecorator';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import GroupMember from '@/app/com/main/module/business/group/bean/GroupMember';
import GroupMemberService from '@/app/com/main/module/business/group/service/GroupMemberService';

export default class GroupMemberAction extends AbstractMaterial {

    private static action: string = '1.3.004';

    /*********************************** back **********************************************/
    @MethodMapping(GroupMemberAction, GroupMemberAction.action, '1.1.0002')
    public setOwnerGroupMemberList(data: any): void {
        if (data && data.body) {
            const list: GroupMember[] = data.body.items;
            if (list) {
                const ccs: GroupMemberService = this.appContext.getMaterial(GroupMemberService);
                ccs.setOwnerGroupMemberList(list);
            }
        }
    }


    /*********************************** push **********************************************/
    @MethodMapping(GroupMemberAction, GroupMemberAction.action, '1.2.0001')
    public addMember(data: any): void {
        if (data && data.body) {
            const userId: string = data.body.userId;
            const groupId: string = data.body.groupId;
            if (groupId && userId) {
                const ccs: GroupMemberService = this.appContext.getMaterial(GroupMemberService);
                ccs.addMemberByUserId(groupId, userId);
            }
        }
    }

    @MethodMapping(GroupMemberAction, GroupMemberAction.action, '1.2.0002')
    public updateMember(data: any): void {
        if (data && data.body) {
            const userId: string = data.body.userId;
            const groupId: string = data.body.groupId;
            if (groupId && userId) {
                const ccs: GroupMemberService = this.appContext.getMaterial(GroupMemberService);
                ccs.updateMemberByUserId(groupId, userId);
            }
        }
    }

    @MethodMapping(GroupMemberAction, GroupMemberAction.action, '1.2.0003')
    public updatePosition(data: any): void {
        if (data && data.body) {
            const userId: string = data.body.userId;
            const groupId: string = data.body.groupId;
            const position: string = data.body.position;
            if (groupId && userId && position) {
                const ccs: GroupMemberService = this.appContext.getMaterial(GroupMemberService);
                ccs.updatePosition(groupId, userId, position);
            }
        }
    }

    @MethodMapping(GroupMemberAction, GroupMemberAction.action, '1.2.0004')
    public deleteMember(data: any): void {
        if (data && data.body) {
            const userId: string = data.body.userId;
            const groupId: string = data.body.groupId;
            if (groupId && userId) {
                const ccs: GroupMemberService = this.appContext.getMaterial(GroupMemberService);
                ccs.deleteMember(groupId, userId);
            }
        }
    }
}

