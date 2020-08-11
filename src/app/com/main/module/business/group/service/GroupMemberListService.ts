import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import GroupMember from '@/app/com/main/module/business/group/bean/GroupMember';
import User from '@/app/com/main/module/business/user/bean/User';
import GroupMemberManager from '@/app/com/main/module/business/group/manager/GroupMemberManager';
import GroupMemberListViewManager from '@/app/com/main/module/business/group/manager/GroupMemberListViewManager';


export default class GroupMemberListService extends AbstractMaterial {

    public setGroupMembers(groupId: string, members: GroupMember[], users: User[]) {
        const manager: GroupMemberListViewManager = this.appContext.getMaterial(GroupMemberListViewManager);
        manager.setGroupMembers(groupId, members, users);
    }
}
