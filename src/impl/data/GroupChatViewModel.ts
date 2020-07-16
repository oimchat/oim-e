import Group from '@/app/com/bean/Group';
import ChatViewModel from '@/impl/data/ChatViewModel';
import GroupMember from '@/app/com/bean/GroupMember';
import User from '@/app/com/bean/User';
import Content from '@/app/com/data/chat/content/Content';
import app from '@/app/App';
import MessageAppendType from '@/app/com/main/setting/message/type/MessageAppendType';
import MessageAppendGroupSetting from '@/app/com/main/setting/message/MessageAppendGroupSetting';

class GroupChatViewModel extends ChatViewModel {

    public groupMemberData: {
        users: User[],
    } = {
        users: [],
    };
    public groupMemberUserListMap: Map<string, User[]> = new Map<string, User[]>();

    public setGroup(group: Group) {
        const groupId = (group) ? group.id : '';
        this.setChat(groupId);
        this.chatData.key = groupId;

        const users: User[] = this.getMemberUserList(groupId);
        this.groupMemberData.users = users;
        this.messageInfo.showNameVisible = true;
    }

    public setName(name: string) {
        this.chatData.name = name;
    }

    public insertLast(isReceive: boolean, isOwn: boolean, key: string, showName: string, chatUser: User, content: Content): void {
        super.insertLast(isReceive, isOwn, key, showName, chatUser, content);
        const setting: MessageAppendGroupSetting = app.appContext.getMaterial(MessageAppendGroupSetting);
        const type = setting.getType(key);
        if (MessageAppendType.bottom === type) {
            if (typeof this.cacheData.updateScroll === 'function') {
                setTimeout(() => {
                    const h = this.cacheData.getScrollHeight();
                    this.cacheData.updateScroll(h);
                }, 50);
            }
        }
    }

    public setUserList(groupId: string, list: User[]): void {
        const users: User[] = this.getMemberUserList(groupId);
        const length = users.length;
        if (length > 0) {
            users.splice(0, length);
        }
        for (const u of list) {
            users.push(u);
        }
    }

    public setMemberList(groupId: string, list: GroupMember[]): void {
        //  todo
    }

    public updateMember(groupId: string, member: GroupMember): void {
        //  todo
    }

    public updateUser(groupId: string, user: User): void {
        if (groupId && user) {
            const users: User[] = this.getMemberUserList(groupId);
            let index = -1;
            for (const u of users) {
                if (u.id === user.id) {
                    index = users.indexOf(u);
                }
            }

            if (index > -1) {
                users.splice(index, 1, user);
            }
        }
    }

    public deleteUser(groupId: string, userId: string): void {
        if (groupId && userId) {
            const users: User[] = this.getMemberUserList(groupId);
            let index = -1;
            for (const u of users) {
                if (u.id === userId) {
                    index = users.indexOf(u);
                }
            }

            if (index > -1) {
                users.splice(index, 1);
            }
        }
    }

    public deleteMember(groupId: string, userId: string): void {
        //  todo
    }

    public getMemberUserList(key: string): User[] {
        let list = this.groupMemberUserListMap.get(key);
        if (!list) {
            list = [];
            this.groupMemberUserListMap.set(key, list);
        }
        return list;
    }
}

export default new GroupChatViewModel();
