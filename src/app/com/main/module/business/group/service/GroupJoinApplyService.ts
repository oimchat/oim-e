import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import GroupJoinApplyQuery from '@/app/com/main/module/business/group/data/GroupJoinApplyQuery';
import DataBackAction from '@/app/base/net/DataBackAction';
import Page from '@/app/com/common/data/Page';
import User from '@/app/com/main/module/business/user/bean/User';
import AbstractDataBackAction from '@/app/base/net/AbstractDataBackAction';
import UserSender from '@/app/com/main/module/business/user/sender/UserSender';
import GroupJoinApplyEntityCase from '@/app/com/main/module/business/group/data/GroupJoinApplyEntityCase';
import GroupJoinApply from '@/app/com/main/module/business/group/bean/GroupJoinApply';
import GroupJoinSender from '@/app/com/main/module/business/group/sender/GroupJoinSender';
import GroupInfoSender from '@/app/com/main/module/business/group/sender/GroupInfoSender';
import Group from '@/app/com/main/module/business/group/bean/Group';


export default class GroupJoinApplyService extends AbstractMaterial {

    public queryApplyDataReceiveList(query: GroupJoinApplyQuery,
                                     page: Page,
                                     back: (p: Page, applicants: GroupJoinApplyEntityCase[]) => void): void {
        const own = this;
        const sender: GroupJoinSender = this.appContext.getMaterial(GroupJoinSender);
        const userSender: UserSender = this.appContext.getMaterial(UserSender);
        const groupSender: GroupInfoSender = this.appContext.getMaterial(GroupInfoSender);

        const groupIds: string[] = [];
        const applicants: GroupJoinApplyEntityCase[] = [];
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
                            const apply: GroupJoinApply = value.apply;
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
                            const apply: GroupJoinApply = value.apply;
                            if (apply) {

                                const userId = value.apply.applyUserId;
                                const u: any = userMap.get(userId);
                                value.user = u;
                            }
                        }
                    }
                    groupSender.getGroups(groupIds, groupBack, false);
                }
            },
        } as AbstractDataBackAction;


        sender.queryJoinApplyDataReceiveList(query, page, this.appContext.createDataBackAction((data: any) => {
            if (data && data.body) {
                const items: GroupJoinApplyEntityCase[] = data.body.items;
                p = data.body.page;
                if (items) {
                    const userIds: string[] = [];
                    for (const value of items) {
                        const apply: GroupJoinApply = value.apply;
                        if (apply) {
                            const groupId = value.apply.groupId;
                            const userId = value.apply.applyUserId;
                            userIds.push(userId);
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
