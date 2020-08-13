import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import User from '@/app/com/main/module/business/user/bean/User';
import GroupMember from '@/app/com/main/module/business/group/bean/GroupMember';
import WorkViewEnum from '@/app/com/common/view/WorkViewEnum';
import GroupMemberListView from '@/app/com/main/module/business/group/view/GroupMemberListView';

export default class GroupMemberListViewManager extends AbstractMaterial {

    public setGroupMembers(groupId: string, members: GroupMember[], users: User[]) {
        const view: GroupMemberListView = this.appContext.getView(WorkViewEnum.GroupMemberListView);

        view.setMemberList(groupId, members);
        view.setUserList(groupId, users);
    }

    public updateMember(groupId: string, member: GroupMember): void {
        const view: GroupMemberListView = this.appContext.getView(WorkViewEnum.GroupMemberListView);
        view.updateMember(groupId, member);
    }

    public updateUser(groupId: string, user: User): void {
        const view: GroupMemberListView = this.appContext.getView(WorkViewEnum.GroupMemberListView);
        view.updateUser(groupId, user);
    }

    public deleteUser(groupId: string, userId: string): void {
        const view: GroupMemberListView = this.appContext.getView(WorkViewEnum.GroupMemberListView);
        view.deleteUser(groupId, userId);
    }

    public deleteMember(groupId: string, userId: string): void {
        const view: GroupMemberListView = this.appContext.getView(WorkViewEnum.GroupMemberListView);
        view.deleteMember(groupId, userId);
    }
}
