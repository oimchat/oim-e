import AbstractMaterial from '@/app/base/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import GroupMemberSender from '@/app/com/main/sender/GroupMemberSender';
import GroupMemberService from '@/app/com/main/service/GroupMemberService';
import GroupMemberListService from '@/app/com/main/service/GroupMemberListService';
import GroupMember from '@/app/com/bean/GroupMember';
import User from '@/app/com/bean/User';

export default class GroupMemberListController extends AbstractMaterial {


    public loadMemberListByGroupId(groupId: string): void {
        const groupMemberService: GroupMemberService = this.appContext.getMaterial(GroupMemberService);
        const groupMemberListService: GroupMemberListService = this.appContext.getMaterial(GroupMemberListService);
        if (groupMemberService.isLoadMemberList(groupId)) {
            const members: GroupMember[] = groupMemberService.getGroupMemberList(groupId);
            const users: User[] = groupMemberService.getGroupMemberUserList(groupId);
            groupMemberListService.setGroupMembers(groupId, members, users);
        } else {
            groupMemberService.loadMemberList(groupId, (success: boolean, memberList: GroupMember[], userList: User[], message: string) => {
                    if (success) {
                        groupMemberListService.setGroupMembers(groupId, memberList, userList);
                    } else {
                        this.appContext.prompt('群成员加载失败');
                    }
                },
            );
        }
    }
}
