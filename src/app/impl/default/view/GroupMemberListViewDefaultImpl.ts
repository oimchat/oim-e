import GroupMemberListView from '@/app/com/main/module/business/group/view/GroupMemberListView';
import GroupMember from '@/app/com/main/module/business/group/bean/GroupMember';
import User from '@/app/com/main/module/business/user/bean/User';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';

export default class GroupMemberListViewDefaultImpl extends AbstractMaterial implements GroupMemberListView {

    public deleteMember(groupId: string, userId: string): void {
        // no
    }

    public deleteUser(groupId: string, userId: string): void {
        // no
    }

    public setMemberList(groupId: string, list: GroupMember[]): void {
        // no
    }

    public setUserList(groupId: string, list: User[]): void {
        // no
    }

    public updateMember(groupId: string, member: GroupMember): void {
        // no
    }

    public updateUser(groupId: string, user: User): void {
        // no
    }
}
