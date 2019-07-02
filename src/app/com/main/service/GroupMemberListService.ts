import AbstractMaterial from '@/app/base/AbstractMaterial';
import GroupMember from '@/app/com/bean/GroupMember';
import User from '@/app/com/bean/User';
import GroupMemberManager from '@/app/com/main/manager/GroupMemberManager';
import GroupMemberListManager from '@/app/com/main/manager/GroupMemberListManager';


export default class GroupMemberListService extends AbstractMaterial {

    public setGroupMembers(groupId: string, members: GroupMember[], users: User[]) {
        const manager: GroupMemberListManager = this.appContext.getMaterial(GroupMemberListManager);
        manager.setGroupMembers(groupId, members, users);
    }
}
