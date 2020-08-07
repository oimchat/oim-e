import {MethodMapping} from '@/app/base/action/annotation/ActionDecorator';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import GroupRelationService from '@/app/com/main/module/business/group/service/GroupRelationService';
import GroupRelation from '@/app/com/main/module/business/group/bean/GroupRelation';
import GroupBusinessService from '@/app/com/main/module/business/group/service/GroupBusinessService';
import GroupMemberService from '@/app/com/main/module/business/group/service/GroupMemberService';

export default class GroupRelationAction extends AbstractMaterial {

    private static action: string = '1.3.003';

    @MethodMapping(GroupRelationAction, GroupRelationAction.action, '1.1.0002')
    public setList(data: any): void {
        if (data && data.body) {
            const list: GroupRelation[] = data.body.items;
            if (list) {
                const ccs: GroupRelationService = this.appContext.getMaterial(GroupRelationService);
                ccs.setList(list);

                const groupIds: string[] = [];
                for (const value of list) {
                    groupIds.push(value.groupId);
                }
                const gbs: GroupBusinessService = this.appContext.getMaterial(GroupBusinessService);
                gbs.loadGroups(groupIds);
            }
        }
    }


    @MethodMapping(GroupRelationAction, GroupRelationAction.action, '1.2.0001')
    public add(data: any): void {
        if (data && data.body) {
            const groupId: string = data.body.groupId;
            if (groupId) {
                const ccs: GroupRelationService = this.appContext.getMaterial(GroupRelationService);
                ccs.addByGroupId(groupId);
                const contactService: GroupBusinessService = this.appContext.getMaterial(GroupBusinessService);
                contactService.addByGroupId(groupId);

                const groupMemberService: GroupMemberService = this.appContext.getMaterial(GroupMemberService);
                groupMemberService.loadOwnerGroupMember(groupId);
            }
        }
    }

    @MethodMapping(GroupRelationAction, GroupRelationAction.action, '1.2.0002')
    public updateRemark(data: any): void {
        if (data && data.body) {
            const groupId: string = data.body.groupId;
            const remark: string = data.body.remark;
            if (groupId) {
                const ccs: GroupRelationService = this.appContext.getMaterial(GroupRelationService);
                ccs.updateRemark(groupId, remark);
            }
        }
    }

    @MethodMapping(GroupRelationAction, GroupRelationAction.action, '1.2.0003')
    public moveCategory(data: any): void {
        if (data && data.body) {
            const groupIds: string[] = data.body.groupIds;
            const categoryId: string = data.body.categoryId;
            if (groupIds) {
                const ccs: GroupRelationService = this.appContext.getMaterial(GroupRelationService);
                ccs.moveCategory(groupIds, categoryId);
            }
        }
    }

    @MethodMapping(GroupRelationAction, GroupRelationAction.action, '1.2.0004')
    public delete(data: any): void {
        if (data && data.body) {
            const groupId: string = data.body.groupId;
            if (groupId) {
                const ccs: GroupRelationService = this.appContext.getMaterial(GroupRelationService);
                ccs.delete(groupId);
            }
        }
    }
}
