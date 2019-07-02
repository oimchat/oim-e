import View from '@/app/com/main/view/View';
import User from '@/app/com/bean/User';
import GroupMember from '@/app/com/bean/GroupMember';

export default interface GroupMemberListView extends View {

    setUserList(groupId: string, list: User[]): void;

    setMemberList(groupId: string, list: GroupMember[]): void;

    updateMember(groupId: string, member: GroupMember): void;

    updateUser(groupId: string, user: User): void;

    deleteUser(groupId: string, userId: string): void;

    deleteMember(groupId: string, userId: string): void;
}
