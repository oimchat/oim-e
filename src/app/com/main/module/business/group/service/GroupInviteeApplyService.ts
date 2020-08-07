import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import GroupInviteApplyQuery from '@/app/com/main/module/business/group/data/GroupInviteApplyQuery';
import DataBackAction from '@/app/base/net/DataBackAction';
import Page from '@/app/com/common/data/Page';
import User from '@/app/com/main/module/business/user/bean/User';
import AbstractDataBackAction from '@/app/base/net/AbstractDataBackAction';
import UserSender from '@/app/com/main/module/business/user/sender/UserSender';
import GroupInviteApplyEntityCase from '@/app/com/main/module/business/group/data/GroupInviteApplyEntityCase';
import GroupInviteApply from '@/app/com/main/module/business/group/bean/GroupInviteApply';
import GroupInviteSender from '@/app/com/main/module/business/group/sender/GroupInviteSender';
import GroupInfoSender from '@/app/com/main/module/business/group/sender/GroupInfoSender';
import Group from '@/app/com/main/module/business/group/bean/Group';
import GroupInviteeApplyQuery from '@/app/com/main/module/business/group/data/GroupInviteeApplyQuery';


export default class GroupInviteeApplyService extends AbstractMaterial {

    public queryInviteeDataList(query: GroupInviteeApplyQuery,
                                page: Page,
                                back: (p: Page, applicants: GroupInviteApplyEntityCase[]) => void): void {
        const own = this;
        const sender: GroupInviteSender = this.appContext.getMaterial(GroupInviteSender);
        const userSender: UserSender = this.appContext.getMaterial(UserSender);
        const groupSender: GroupInfoSender = this.appContext.getMaterial(GroupInfoSender);

        const groupIds: string[] = [];
        const applicants: GroupInviteApplyEntityCase[] = [];
        let p: Page = page;
        const groupBack: DataBackAction = {
            back(data: any): void {
                if (data && data.body) {
                    const items: Group[] = data.body.items;
                    if (items) {
                        const groupMap: Map<string, Group> = new Map<string, Group>();
                        for (const group of items) {
                            groupMap.set(group.id, group);
                        }
                        for (const value of applicants) {
                            const apply: GroupInviteApply = value.apply;
                            if (apply) {
                                const groupId = value.apply.groupId;
                                const g: any = groupMap.get(groupId);
                                value.group = g;
                            }
                        }
                    }
                    back(p, applicants);
                }
            },
        } as AbstractDataBackAction;

        const userBack: DataBackAction = {
            back(data: any): void {
                if (data && data.body) {
                    const items: User[] = data.body.items;
                    if (items) {
                        const userMap: Map<string, User> = new Map<string, User>();
                        for (const user of items) {
                            userMap.set(user.id, user);
                        }
                        for (const value of applicants) {
                            const apply: GroupInviteApply = value.apply;
                            if (apply) {

                                const inviterUserId = apply.inviterUserId;
                                const inviteeUserId = apply.inviteeUserId;
                                const inviterUser: any = userMap.get(inviterUserId);
                                const inviteeUser: any = userMap.get(inviteeUserId);

                                value.inviterUser = inviterUser;
                                value.inviteeUser = inviteeUser;
                            }
                        }
                    }
                    groupSender.getGroups(groupIds, groupBack, false);
                }
            },
        } as AbstractDataBackAction;


        sender.queryInviteeList(query, page, this.appContext.createDataBackAction((data: any) => {
            if (data && data.body) {
                const items: GroupInviteApply[] = data.body.items;
                p = data.body.page;
                if (items) {
                    const userIds: string[] = [];
                    for (const apply of items) {

                        if (apply) {
                            const value: GroupInviteApplyEntityCase = new GroupInviteApplyEntityCase();
                            const groupId = apply.groupId;
                            const inviterUserId = apply.inviterUserId;
                            const inviteeUserId = apply.inviteeUserId;

                            value.apply = apply;
                            userIds.push(inviterUserId);
                            userIds.push(inviteeUserId);
                            groupIds.push(groupId);
                            applicants.push(value);
                        }
                    }
                    userSender.getUsers(userIds, userBack, false);
                }
            }
        }));
    }
}
