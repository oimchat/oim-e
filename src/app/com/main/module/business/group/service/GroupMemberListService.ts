import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import GroupMember from '@/app/com/main/module/business/group/bean/GroupMember';
import User from '@/app/com/main/module/business/user/bean/User';
import GroupMemberManager from '@/app/com/main/module/business/group/manager/GroupMemberManager';
import GroupMemberListManager from '@/app/com/main/module/business/group/manager/GroupMemberListManager';


export default class GroupMemberListService extends AbstractMaterial {

    public setGroupMembers(groupId: string, members: GroupMember[], users: User[]) {
        const manager: GroupMemberListManager = this.appContext.getMaterial(GroupMemberListManager);
        manager.setGroupMembers(groupId, members, users);
    }
}
