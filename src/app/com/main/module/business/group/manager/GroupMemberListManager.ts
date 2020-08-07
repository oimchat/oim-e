import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import User from '@/app/com/main/module/business/user/bean/User';
import UserBox from '@/app/com/main/module/business/user/box/UserBox';
import BaseUtil from '@/app/lib/util/BaseUtil';
import UserInfoUtil from '@/app/com/main/common/util/UserInfoUtil';
import GroupMemberBox from '@/app/com/main/module/business/group/box/GroupMemberBox';
import GroupMember from '@/app/com/main/module/business/group/bean/GroupMember';
import PersonalView from '@/app/com/main/module/business/personal/view/PersonalView';
import ViewEnum from '@/app/com/client/common/view/ViewEnum';
import GroupMemberListView from '@/app/com/main/module/business/group/view/GroupMemberListView';

export default class GroupMemberListManager extends AbstractMaterial {

    public setGroupMembers(groupId: string, members: GroupMember[], users: User[]) {
        const view: GroupMemberListView = this.appContext.getView(ViewEnum.GroupMemberListView);

        view.setMemberList(groupId, members);
        view.setUserList(groupId, users);
    }


    public updateMember(groupId: string, member: GroupMember): void {
        const view: GroupMemberListView = this.appContext.getView(ViewEnum.GroupMemberListView);
        view.updateMember(groupId, member);
    }

    public updateUser(groupId: string, user: User): void {
        const view: GroupMemberListView = this.appContext.getView(ViewEnum.GroupMemberListView);
        view.updateUser(groupId, user);
    }

    public deleteUser(groupId: string, userId: string): void {
        const view: GroupMemberListView = this.appContext.getView(ViewEnum.GroupMemberListView);
        view.deleteUser(groupId, userId);
    }

    public deleteMember(groupId: string, userId: string): void {
        const view: GroupMemberListView = this.appContext.getView(ViewEnum.GroupMemberListView);
        view.deleteMember(groupId, userId);
    }
}
