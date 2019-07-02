import GroupMemberListView from '@/app/com/main/view/GroupMemberListView';
import GroupMember from '@/app/com/bean/GroupMember';
import User from '@/app/com/bean/User';
import groupChatViewModel from '@/impl/data/GroupChatViewModel';
import AbstractMaterial from '@/app/base/AbstractMaterial';

export default class GroupMemberListViewImpl extends AbstractMaterial implements GroupMemberListView {

    public deleteMember(groupId: string, userId: string): void {
        groupChatViewModel.deleteMember(groupId, userId);
    }

    public deleteUser(groupId: string, userId: string): void {
        groupChatViewModel.deleteUser(groupId, userId);
    }

    public setMemberList(groupId: string, list: GroupMember[]): void {
        groupChatViewModel.setMemberList(groupId, list);
    }

    public setUserList(groupId: string, list: User[]): void {
        groupChatViewModel.setUserList(groupId, list);
    }

    public updateMember(groupId: string, member: GroupMember): void {
        groupChatViewModel.updateMember(groupId, member);
    }

    public updateUser(groupId: string, user: User): void {
        groupChatViewModel.updateUser(groupId, user);
    }
}
