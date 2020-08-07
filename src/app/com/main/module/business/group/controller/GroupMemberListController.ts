import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import GroupMemberService from '@/app/com/main/module/business/group/service/GroupMemberService';
import GroupMemberListService from '@/app/com/main/module/business/group/service/GroupMemberListService';
import GroupMember from '@/app/com/main/module/business/group/bean/GroupMember';
import User from '@/app/com/main/module/business/user/bean/User';
import Prompter from '@/app/com/main/component/Prompter';

export default class GroupMemberListController extends AbstractMaterial {


    public loadMemberListByGroupId(groupId: string): void {
        const prompter: Prompter = this.appContext.getMaterial(Prompter);
        const groupMemberService: GroupMemberService = this.appContext.getMaterial(GroupMemberService);
        const groupMemberListService: GroupMemberListService = this.appContext.getMaterial(GroupMemberListService);
        if (groupMemberService.isLoadMemberList(groupId)) {
            const members: GroupMember[] = groupMemberService.getGroupMemberList(groupId);
            const users: User[] = groupMemberService.getGroupMemberUserList(groupId);
            groupMemberListService.setGroupMembers(groupId, members, users);
        } else {
            groupMemberService.getAllMemberList(groupId, (success: boolean, memberList: GroupMember[], userList: User[], message: string) => {
                    if (success) {
                        groupMemberListService.setGroupMembers(groupId, memberList, userList);
                    } else {
                        prompter.prompt('群成员加载失败');
                    }
                },
            );
        }
    }

    public getAllMemberUserList(groupId: string, back: (success: boolean, userList: User[], message: string) => void) {
        const own = this;
        const prompter: Prompter = this.appContext.getMaterial(Prompter);
        const groupMemberService: GroupMemberService = this.appContext.getMaterial(GroupMemberService);

        groupMemberService.getAllMemberList(groupId, (success: boolean, memberList: GroupMember[], userList: User[], message: string) => {
                if (success) {
                    back(success, userList, message);
                } else {
                    prompter.prompt('群成员加载失败');
                }
            },
        );
    }

    public getAllMemberDataList(groupId: string, back: (success: boolean, memberList: GroupMember[], userList: User[], message: string) => void) {
        const service: GroupMemberService = this.appContext.getMaterial(GroupMemberService);
        service.getAllMemberList(groupId, back);
    }
}
