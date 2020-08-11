import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import GroupMemberHandler from '@/app/com/main/module/business/group/handler/GroupMemberHandler';
import Page from '@/app/com/common/data/Page';
import GroupMember from '@/app/com/main/module/business/group/bean/GroupMember';
import User from '@/app/com/main/module/business/user/bean/User';

export default class GroupMemberUserController extends AbstractMaterial {

    public getGroupMemberUserPageList(groupId: string, page: Page, back: (success: boolean, memberList: GroupMember[], userList: User[], message: string) => void): void {
        const handler: GroupMemberHandler = this.appContext.getMaterial(GroupMemberHandler);
        handler.getGroupMemberUserPageList(groupId, page, back);
    }

    public getAllMemberUserList(groupId: string, back: (success: boolean, memberList: GroupMember[], userList: User[], message: string) => void): void {
        const handler: GroupMemberHandler = this.appContext.getMaterial(GroupMemberHandler);
        handler.getAllMemberUserList(groupId, back);
    }
}
