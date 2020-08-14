import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import Page from '@/app/com/common/data/Page';
import GroupMemberSender from '@/app/com/main/module/business/group/sender/GroupMemberSender';
import GroupMember from '@/app/com/main/module/business/group/bean/GroupMember';
import User from '@/app/com/main/module/business/user/bean/User';
import DataBackAction from '@/app/base/net/DataBackAction';
import UserAccess from '@/app/com/main/module/business/user/access/UserAccess';
import ObjectUtil from '@/app/common/util/ObjectUtil';

export default class GroupMemberHandler extends AbstractMaterial {


    public getAllMemberUserList(groupId: string, back: (success: boolean, memberList: GroupMember[], userList: User[], message: string) => void) {
        const own = this;
        const sender: GroupMemberSender = this.appContext.getMaterial(GroupMemberSender);
        const countBack = this.appContext.createDataBackAction((data: any) => {
            if (data.body && data.body.count) {
                const count: number = data.body.count;
                own.getMemberUserListByCount(groupId, count, back);
            }
        });
        sender.getGroupMemberCount(groupId, countBack);
    }

    public getMemberUserListByCount(groupId: string, count: number, back: (success: boolean, memberList: GroupMember[], userList: User[], message: string) => void): void {
        const own = this;
        const page: Page = new Page();
        page.setTotalCount(count);
        const totalPage = page.getTotalPage();
        const promises: Array<Promise<{ success: boolean, members: GroupMember[], users: User[], message: string }>> = [];
        for (let i = 0; i < totalPage; i++) {
            const promise = new Promise<{ success: boolean, members: GroupMember[], users: User[], message: string }>((resolve) => {
                const pg: Page = new Page();
                pg.number = (i + 1);
                own.getGroupMemberUserPageList(groupId, pg, (
                    mark,
                    text,
                    ms,
                    us) => {
                    resolve({success: mark, members: ms, users: us, message: text});
                });
            });
            promises.push(promise);
        }
        Promise.all(promises).then((values) => {
            let success: boolean = true;
            let members: GroupMember[] = [];
            let users: User[] = [];
            let message: string = '';
            const length = values.length;
            for (let i = 0; i < length; i++) {
                const value = values[i];
                if (value.success) {
                    if (value.members) {
                        for (const m of value.members) {
                            members.push(m);
                        }
                    }
                    if (value.users) {
                        for (const u of value.users) {
                            users.push(u);
                        }
                    }
                } else {
                    success = false;
                    members = [];
                    users = [];
                    message = value.message;
                    break;
                }
            }
            back(success, members, users, message);
        });
    }

    public getGroupMemberUserPageList(groupId: string, page: Page, back: (success: boolean, message: string, memberList: GroupMember[], userList: User[]) => void) {
        const own = this;
        const userAccess: UserAccess = this.appContext.getMaterial(UserAccess);

        own.getGroupMemberPageList(groupId, page, (mark, members, text) => {
            if (mark) {
                const userIds: string[] = [];
                for (const value of members) {
                    if (value) {
                        const userId = value.userId;
                        userIds.push(userId);
                    }
                }
                userAccess.getUsersByIds(userIds, (s, m, users) => {
                    if (s) {
                        back(s, m, members, users);
                    } else {
                        back(mark, text, members, users);
                    }
                });
            } else {
                back(mark, text, members, []);
            }
        });
    }

    public getGroupMemberPageList(groupId: string, page: Page, back: (success: boolean, memberList: GroupMember[], message: string) => void) {
        const sender: GroupMemberSender = this.appContext.getMaterial(GroupMemberSender);

        let members: GroupMember[];
        let mark = false;
        let text = '请求失败！';

        const memberBack: DataBackAction = {
            back(data: any): void {
                if (data) {
                    const info = data.info;
                    if (info) {
                        if (info.success && data.body) {
                            const p: Page = data.body.page;
                            members = data.body.items;
                            mark = true;
                            text = '';
                            if (p) {
                                ObjectUtil.copyByTargetKey(page, p);
                            }
                        }
                    }
                }
                back(mark, members, text);
            },
            lost(data: any): void {
                back(mark, members, text);
            },
            timeOut(data: any): void {
                back(false, members, '请求超时！');
            },
        } as DataBackAction;
        sender.getGroupMemberList(groupId, page, memberBack);
    }
}
