import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import GroupMember from '@/app/com/main/module/business/group/bean/GroupMember';
import GroupMemberListOfPersonalBox from '@/app/com/main/module/business/group/box/GroupMemberListOfPersonalBox';
import User from '@/app/com/main/module/business/user/bean/User';
import GroupMemberManager from '@/app/com/main/module/business/group/manager/GroupMemberManager';
import GroupMemberBox from '@/app/com/main/module/business/group/box/GroupMemberBox';
import GroupMemberSender from '@/app/com/main/module/business/group/sender/GroupMemberSender';
import DataBackAction from '@/app/base/net/DataBackAction';
import GroupMemberUserBox from '@/app/com/main/module/business/group/box/GroupMemberUserBox';
import UserInfoUtil from '@/app/com/main/common/util/UserInfoUtil';
import GroupMemberListManager from '@/app/com/main/module/business/group/manager/GroupMemberListManager';
import PersonalBox from '@/app/com/main/module/business/personal/box/PersonalBox';
import Page from '@/app/com/common/data/Page';
import UserSender from '@/app/com/main/module/business/user/sender/UserSender';
import GroupJoinApply from '@/app/com/main/module/business/group/bean/GroupJoinApply';

export default class GroupMemberService extends AbstractMaterial {

    public setOwnerGroupMemberList(list: GroupMember[]) {
        const box: GroupMemberListOfPersonalBox = this.appContext.getMaterial(GroupMemberListOfPersonalBox);
        box.putGroupMemberList(list);
    }

    public loadOwnerGroupMember(groupId: string) {
        const personalBox: PersonalBox = this.appContext.getMaterial(PersonalBox);
        const box: GroupMemberListOfPersonalBox = this.appContext.getMaterial(GroupMemberListOfPersonalBox);
        const manager: GroupMemberListManager = this.appContext.getMaterial(GroupMemberListManager);
        const memberUserBox: GroupMemberUserBox = this.appContext.getMaterial(GroupMemberUserBox);
        const memberBox: GroupMemberBox = this.appContext.getMaterial(GroupMemberBox);
        const userId = personalBox.getUserId();
        const memberBack: DataBackAction = {
            back(data: any): void {
                if (data) {
                    const info = data.info;
                    if (info) {
                        if (info.success && data.body) {
                            const member = data.body;
                            memberBox.putGroupMember(member);
                            memberUserBox.putGroupMemberUser(groupId, personalBox.getUser());
                            box.putGroupMember(member);
                            const user = memberUserBox.getGroupMemberUser(groupId, userId);
                            if (user) {
                                manager.updateUser(groupId, user);
                            }
                        } else {
                            // no
                        }
                    }
                }
            },
            lost(data: any): void {
                // no
            },
            timeOut(data: any): void {
                //  no
            },
        } as DataBackAction;
        const sender: GroupMemberSender = this.appContext.getMaterial(GroupMemberSender);
        sender.getGroupMember(groupId, userId, memberBack);
    }

    public getUserShowName(groupId: string, user: User): string {
        const manager: GroupMemberManager = this.appContext.getMaterial(GroupMemberManager);
        return manager.getUserShowName(groupId, user);
    }

    public isLoadMemberList(groupId: string): boolean {
        const box: GroupMemberBox = this.appContext.getMaterial(GroupMemberBox);
        return box.hasGroup(groupId);
    }

    public getAllMemberList(groupId: string, back: (success: boolean, memberList: GroupMember[], userList: User[], message: string) => void) {
        const own = this;
        const sender: GroupMemberSender = this.appContext.getMaterial(GroupMemberSender);
        const countBack = this.appContext.createDataBackAction((data: any) => {
            if (data.body && data.body.count) {
                const count: number = data.body.count;
                own.getAllMemberListByCount(groupId, count, back);
            }
        });
        sender.getGroupMemberCount(groupId, countBack);
    }

    public getAllMemberListByCount(groupId: string, count: number, back: (success: boolean, memberList: GroupMember[], userList: User[], message: string) => void): void {
        const own = this;
        const page: Page = new Page();
        page.setTotalCount(count);
        const totalPage = page.getTotalPage();
        for (let i = 0; i < totalPage; i++) {
            page.number = (i + 1);
            own.getMemberPageList(groupId, page, back);
        }
    }

    public getMemberPageList(groupId: string, page: Page, back: (success: boolean, memberList: GroupMember[], userList: User[], message: string) => void) {
        const memberBox: GroupMemberBox = this.appContext.getMaterial(GroupMemberBox);
        const memberUserBox: GroupMemberUserBox = this.appContext.getMaterial(GroupMemberUserBox);
        const sender: GroupMemberSender = this.appContext.getMaterial(GroupMemberSender);
        const userSender: UserSender = this.appContext.getMaterial(UserSender);

        let members: GroupMember[];


        const userBack: DataBackAction = {
            back(data: any): void {
                if (data) {
                    const info = data.info;
                    if (info) {
                        if (info.success && data.body) {
                            const list: User[] = data.body.items;
                            if (list) {
                                for (const u of list) {
                                    UserInfoUtil.handleAvatar(u);
                                }
                            }
                            memberUserBox.putGroupMemberUserList(groupId, list);
                            back(true, members, list, '');
                        } else {
                            back(false, [], [], '请求失败！');
                        }
                    }
                }
            },
            lost(data: any): void {
                back(false, [], [], '请求失败！');
            },
            timeOut(data: any): void {
                back(false, [], [], '请求超时！');
            },
        } as DataBackAction;


        const memberBack: DataBackAction = {
            back(data: any): void {
                if (data) {
                    const info = data.info;
                    if (info) {
                        if (info.success && data.body) {
                            members = data.body.items;
                            memberBox.putGroupMemberList(members);

                            const userIds: string[] = [];
                            for (const value of members) {
                                if (value) {
                                    const userId = value.userId;
                                    userIds.push(userId);
                                }
                            }
                            userSender.getUsers(userIds, userBack, false);
                        } else {
                            back(false, [], [], '请求失败！');
                        }
                    }
                }
            },
            lost(data: any): void {
                back(false, [], [], '请求失败！');
            },
            timeOut(data: any): void {
                back(false, [], [], '请求超时！');
            },
        } as DataBackAction;
        sender.getGroupMemberList(groupId, page, memberBack);
    }

    public getGroupMemberList(groupId: string): GroupMember[] {
        const memberBox: GroupMemberBox = this.appContext.getMaterial(GroupMemberBox);
        return memberBox.getGroupMemberList(groupId);
    }

    public getGroupMemberUserList(groupId: string): User[] {
        const memberUserBox: GroupMemberUserBox = this.appContext.getMaterial(GroupMemberUserBox);
        return memberUserBox.getGroupMemberUserList(groupId);
    }

    public addMemberByUserId(groupId: string, userId: string) {
        const manager: GroupMemberListManager = this.appContext.getMaterial(GroupMemberListManager);
        this.getAllMemberList(groupId, (success: boolean, memberList: GroupMember[], userList: User[], message: string) => {
            if (success) {
                manager.setGroupMembers(groupId, memberList, userList);
            }
        });
    }

    public updateMemberByUserId(groupId: string, userId: string) {
        const manager: GroupMemberListManager = this.appContext.getMaterial(GroupMemberListManager);
        const memberUserBox: GroupMemberUserBox = this.appContext.getMaterial(GroupMemberUserBox);
        const memberBox: GroupMemberBox = this.appContext.getMaterial(GroupMemberBox);
        const memberBack: DataBackAction = {
            back(data: any): void {
                if (data) {
                    const info = data.info;
                    if (info) {
                        if (info.success && data.body) {
                            const member = data.body;
                            memberBox.putGroupMember(member);
                            const user = memberUserBox.getGroupMemberUser(groupId, userId);
                            if (user) {
                                manager.updateUser(groupId, user);
                            }
                        } else {
                            // no
                        }
                    }
                }
            },
            lost(data: any): void {
                // no
            },
            timeOut(data: any): void {
                //  no
            },
        } as DataBackAction;
        const sender: GroupMemberSender = this.appContext.getMaterial(GroupMemberSender);
        sender.getGroupMember(groupId, userId, memberBack);
    }

    public updatePosition(groupId: string, userId: string, position: string) {
        const memberBox: GroupMemberBox = this.appContext.getMaterial(GroupMemberBox);
        memberBox.updatePosition(groupId, userId, position);

        const personalGroupMemberListBox: GroupMemberListOfPersonalBox = this.appContext.getMaterial(GroupMemberListOfPersonalBox);
        const personalBox: PersonalBox = this.appContext.getMaterial(PersonalBox);

        const ownerUserId = personalBox.getUserId();
        if (userId === ownerUserId) {
            personalGroupMemberListBox.updatePosition(groupId, position);
        }
    }

    public deleteMember(groupId: string, userId: string) {
        const memberBox: GroupMemberBox = this.appContext.getMaterial(GroupMemberBox);
        const memberUserBox: GroupMemberUserBox = this.appContext.getMaterial(GroupMemberUserBox);

        memberBox.removeGroupMember(groupId, userId);
        memberUserBox.removeGroupMemberUser(groupId, userId);

        const manager: GroupMemberListManager = this.appContext.getMaterial(GroupMemberListManager);
        manager.deleteMember(groupId, userId);
    }
}
