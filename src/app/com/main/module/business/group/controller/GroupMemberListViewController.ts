import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import GroupMemberService from '@/app/com/main/module/business/group/service/GroupMemberService';
import GroupMemberListService from '@/app/com/main/module/business/group/service/GroupMemberListService';
import GroupMember from '@/app/com/main/module/business/group/bean/GroupMember';
import User from '@/app/com/main/module/business/user/bean/User';
import Prompter from '@/app/com/client/component/Prompter';

export default class GroupMemberListViewController extends AbstractMaterial {


    public loadMemberListByGroupId(groupId: string): void {
        const prompter: Prompter = this.appContext.getMaterial(Prompter);
        const groupMemberService: GroupMemberService = this.appContext.getMaterial(GroupMemberService);
        const groupMemberListService: GroupMemberListService = this.appContext.getMaterial(GroupMemberListService);
        groupMemberService.loadAllMemberUserList(groupId, (success: boolean, memberList: GroupMember[], userList: User[], message: string) => {
                if (success) {
                    groupMemberListService.setGroupMembers(groupId, memberList, userList);
                } else {
                    prompter.prompt('群成员加载失败');
                }
            },
        );
    }
}
