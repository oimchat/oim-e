import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import Page from '@/app/com/common/data/Page';
import GroupMemberSender from '@/app/com/main/module/business/group/sender/GroupMemberSender';
import GroupMember from '@/app/com/main/module/business/group/bean/GroupMember';
import User from '@/app/com/main/module/business/user/bean/User';
import DataBackAction from '@/app/base/net/DataBackAction';
import UserAccess from '@/app/com/main/module/business/user/access/UserAccess';

export default class GroupMemberHandler extends AbstractMaterial {

    public getGroupMemberUserPageList(groupId: string, page: Page, back: (success: boolean, memberList: GroupMember[], userList: User[], message: string) => void) {
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
                userAccess.getUsersByIds(userIds, (s, users, m) => {
                    if (s) {
                        back(s, members, users, m);
                    } else {
                        back(mark, members, users, text);
                    }
                });
            } else {
                back(mark, members, [], text);
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
                            members = data.body.items;
                            mark = true;
                            text = '';
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
