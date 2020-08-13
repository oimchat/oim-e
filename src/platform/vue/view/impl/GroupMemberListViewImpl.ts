import GroupMemberListView from '@/app/com/main/module/business/group/view/GroupMemberListView';
import GroupMember from '@/app/com/main/module/business/group/bean/GroupMember';
import User from '@/app/com/main/module/business/user/bean/User';
import groupMemberListViewModel from '@/platform/vue/view/model/GroupMemberListViewModel';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';

export default class GroupMemberListViewImpl extends AbstractMaterial implements GroupMemberListView {

    public deleteMember(groupId: string, userId: string): void {
        groupMemberListViewModel.deleteMember(groupId, userId);
    }

    public deleteUser(groupId: string, userId: string): void {
        groupMemberListViewModel.deleteUser(groupId, userId);
    }

    public setMemberList(groupId: string, list: GroupMember[]): void {
        groupMemberListViewModel.setMemberList(groupId, list);
    }

    public setUserList(groupId: string, list: User[]): void {
        groupMemberListViewModel.setUserList(groupId, list);
    }

    public updateMember(groupId: string, member: GroupMember): void {
        groupMemberListViewModel.updateMember(groupId, member);
    }

    public updateUser(groupId: string, user: User): void {
        groupMemberListViewModel.updateUser(groupId, user);
    }
}
