import Page from '@/app/com/common/data/Page';
import User from '@/app/com/main/module/business/user/bean/User';
import GroupMember from '@/app/com/main/module/business/group/bean/GroupMember';
import app from '@/app/App';
import GroupMemberUserController from '@/app/com/main/module/business/group/controller/GroupMemberUserController';
import BaseUtil from '@/app/lib/util/BaseUtil';
import ContactRelationBox from '@/app/com/main/module/business/contact/box/ContactRelationBox';

export default class GroupMemberListEntity {

    public groupId: string = '';
    public page: Page = new Page();
    public users: User[] = [];
    public members: GroupMember[] = [];
    public memberMap: Map<string, GroupMember> = new Map<string, GroupMember>();


    public initialize(groupId: string) {
        this.groupId = groupId;
        this.page = new Page();
        this.users = [];
        this.members = [];
        this.loadGroupMembers(groupId);
    }

    public loadGroupMembers(groupId: string) {
        const own = this;
        const page = this.page;
        const controller: GroupMemberUserController = app.appContext.getMaterial(GroupMemberUserController);
        controller.loadAllMemberUserList(groupId, (
            success,
            memberList,
            userList,
            message) => {
            if (!success) {
                app.prompt(message);
            } else {
                own.users = userList;
                own.members = memberList;
                own.memberMap.clear();
                for (const m of memberList) {
                    own.memberMap.set(m.userId, m);
                }
            }
            if (page.totalPage <= 0) {
                page.number = page.totalPage;
            }
        });
    }

    public getNickname(userId: string): string {
        let nickname = '';
        const own = this;
        const map = this.memberMap;
        const member = map.get(userId);
        if (member) {
            nickname = member.nickname;
            if (BaseUtil.isEmpty(nickname)) {
                const box: ContactRelationBox = app.appContext.getMaterial(ContactRelationBox);
                const cr = box.getContactRelationByUserId(userId);
                if (cr && cr.remark) {
                    nickname = cr.remark;
                }
            }
        }
        return nickname;
    }
}
