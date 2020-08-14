import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import GroupMemberHandler from '@/app/com/main/module/business/group/handler/GroupMemberHandler';
import Page from '@/app/com/common/data/Page';
import GroupMember from '@/app/com/main/module/business/group/bean/GroupMember';
import User from '@/app/com/main/module/business/user/bean/User';
import GroupMemberService from '@/app/com/main/module/business/group/service/GroupMemberService';

export default class GroupMemberUserController extends AbstractMaterial {

    public getGroupMemberUserPageList(groupId: string, page: Page, back: (success: boolean, message: string, memberList: GroupMember[], userList: User[]) => void): void {
        const handler: GroupMemberHandler = this.appContext.getMaterial(GroupMemberHandler);
        handler.getGroupMemberUserPageList(groupId, page, back);
    }

    /**
     * 服务器直接查询
     * @param groupId
     * @param back
     */
    public getAllMemberUserList(groupId: string, back: (success: boolean, memberList: GroupMember[], userList: User[], message: string) => void): void {
        const handler: GroupMemberHandler = this.appContext.getMaterial(GroupMemberHandler);
        handler.getAllMemberUserList(groupId, back);
    }

    /**
     * 优先本地，再服务器
     * @param groupId
     * @param back
     */
    public loadAllMemberUserList(groupId: string, back: (success: boolean, memberList: GroupMember[], userList: User[], message: string) => void): void {
        const service: GroupMemberService = this.appContext.getMaterial(GroupMemberService);
        service.loadAllMemberUserList(groupId, back);
    }
}
