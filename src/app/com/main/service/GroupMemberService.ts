import AbstractMaterial from '@/app/base/AbstractMaterial';
import GroupMember from '@/app/com/bean/GroupMember';
import PersonalGroupMemberListBox from '@/app/com/main/box/PersonalGroupMemberListBox';
import User from '@/app/com/bean/User';
import GroupMemberManager from '@/app/com/main/manager/GroupMemberManager';
import GroupMemberBox from '@/app/com/main/box/GroupMemberBox';
import GroupMemberSender from '@/app/com/main/sender/GroupMemberSender';
import DataBackAction from '@/app/base/net/DataBackAction';
import GroupMemberUserBox from '@/app/com/main/box/GroupMemberUserBox';
import UserInfoUtil from '@/app/com/main/util/UserInfoUtil';
import GroupMemberListManager from '@/app/com/main/manager/GroupMemberListManager';
import PersonalBox from '@/app/com/main/box/PersonalBox';

export default class GroupMemberService extends AbstractMaterial {

    public setOwnerGroupMemberList(list: GroupMember[]) {
        const box: PersonalGroupMemberListBox = this.appContext.getMaterial(PersonalGroupMemberListBox);
        box.putGroupMemberList(list);
    }

    public loadOwnerGroupMember(groupId: string) {
        const personalBox: PersonalBox = this.appContext.getMaterial(PersonalBox);
        const box: PersonalGroupMemberListBox = this.appContext.getMaterial(PersonalGroupMemberListBox);
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
                            const member = data.body.data;
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

    public loadMemberList(groupId: string, back: (success: boolean, memberList: GroupMember[], userList: User[], message: string) => void) {
        const memberBox: GroupMemberBox = this.appContext.getMaterial(GroupMemberBox);
        const memberUserBox: GroupMemberUserBox = this.appContext.getMaterial(GroupMemberUserBox);
        const sender: GroupMemberSender = this.appContext.getMaterial(GroupMemberSender);

        const userBack: DataBackAction = {
            back(data: any): void {
                if (data) {
                    const info = data.info;
                    if (info) {
                        if (info.success && data.body) {
                            const list: User[] = data.body.list;
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

        let members: GroupMember[];
        const memberBack: DataBackAction = {
            back(data: any): void {
                if (data) {
                    const info = data.info;
                    if (info) {
                        if (info.success && data.body) {
                            members = data.body.list;
                            memberBox.putGroupMemberList(members);
                            sender.getGroupMemberUserList(groupId, userBack);
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
        sender.getGroupMemberList(groupId, memberBack);
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
        this.loadMemberList(groupId, (success: boolean, memberList: GroupMember[], userList: User[], message: string) => {
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
                            const member = data.body.data;
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

        const personalGroupMemberListBox: PersonalGroupMemberListBox = this.appContext.getMaterial(PersonalGroupMemberListBox);
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
