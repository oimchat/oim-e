import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import GroupRelationBox from '@/app/com/main/module/business/group/box/GroupRelationBox';

export default class GroupRelationAccess extends AbstractMaterial {

    public isJoin(groupId: string): boolean {
        const box: GroupRelationBox = this.appContext.getMaterial(GroupRelationBox);
        return box.inMemberList(groupId);
    }
}
