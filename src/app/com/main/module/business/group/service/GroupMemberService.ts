import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import GroupMember from '@/app/com/main/module/business/group/bean/GroupMember';
import GroupMemberListOfPersonalBox from '@/app/com/main/module/business/group/box/GroupMemberListOfPersonalBox';
import User from '@/app/com/main/module/business/user/bean/User';
import GroupMemberManager from '@/app/com/main/module/business/group/manager/GroupMemberManager';
import GroupMemberBox from '@/app/com/main/module/business/group/box/GroupMemberBox';
import GroupMemberSender from '@/app/com/main/module/business/group/sender/GroupMemberSender';
import DataBackAction from '@/app/base/net/DataBackAction';
import GroupMemberUserBox from '@/app/com/main/module/business/group/box/GroupMemberUserBox';
import GroupMemberListViewManager from '@/app/com/main/module/business/group/manager/GroupMemberListViewManager';
import PersonalBox from '@/app/com/main/module/business/personal/box/PersonalBox';
import GroupMemberHandler from '@/app/com/main/module/business/group/handler/GroupMemberHandler';
import UserInfoUtil from '@/app/com/main/common/util/UserInfoUtil';
import GroupMemberListener from '@/app/com/main/module/business/group/listener/GroupMemberListener';

export default class GroupMemberService extends AbstractMaterial {

    public setOwnerGroupMemberList(list: GroupMember[]) {
        const box: GroupMemberListOfPersonalBox = this.appContext.getMaterial(GroupMemberListOfPersonalBox);
        box.putGroupMemberList(list);
    }

    public loadOwnerGroupMember(groupId: string) {
        const personalBox: PersonalBox = this.appContext.getMaterial(PersonalBox);
        const box: GroupMemberListOfPersonalBox = this.appContext.getMaterial(GroupMemberListOfPersonalBox);
        const manager: GroupMemberListViewManager = this.appContext.getMaterial(GroupMemberListViewManager);
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

    public loadAllMemberUserList(groupId: string, back: (success: boolean, memberList: GroupMember[], userList: User[], message: string) => void) {
        const own = this;
        if (this.isLoadMemberList(groupId)) {
            const members: GroupMember[] = this.getGroupMemberList(groupId);
            const users: User[] = this.getGroupMemberUserList(groupId);
            back(true, members, users, '');
        } else {
            const memberBox: GroupMemberBox = this.appContext.getMaterial(GroupMemberBox);
            const memberUserBox: GroupMemberUserBox = this.appContext.getMaterial(GroupMemberUserBox);
            const handler: GroupMemberHandler = this.appContext.getMaterial(GroupMemberHandler);
            handler.getAllMemberUserList(groupId, (
                success,
                memberList,
                userList,
                message) => {
                if (success) {
                    memberBox.putGroupMemberList(memberList);
                    if (userList) {
                        for (const u of userList) {
                            UserInfoUtil.handleAvatar(u);
                        }
                    }
                    memberUserBox.putGroupMemberUserList(groupId, userList);
                }
                back(success, memberList, userList, message);
            });
        }
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
        const manager: GroupMemberListViewManager = this.appContext.getMaterial(GroupMemberListViewManager);
        this.loadAllMemberUserList(groupId, (success: boolean, memberList: GroupMember[], userList: User[], message: string) => {
            if (success) {
                manager.setGroupMembers(groupId, memberList, userList);
            }
        });
    }

    public updateMemberByUserId(groupId: string, userId: string) {

        const listener: GroupMemberListener = this.appContext.getMaterial(GroupMemberListener);
        const manager: GroupMemberListViewManager = this.appContext.getMaterial(GroupMemberListViewManager);
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
                            listener.handleChangeEvent(member);
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

        const manager: GroupMemberListViewManager = this.appContext.getMaterial(GroupMemberListViewManager);
        manager.deleteMember(groupId, userId);
    }
}
