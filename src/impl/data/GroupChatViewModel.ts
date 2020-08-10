import Group from '@/app/com/main/module/business/group/bean/Group';
import ChatViewModel from '@/impl/data/ChatViewModel';
import GroupMember from '@/app/com/main/module/business/group/bean/GroupMember';
import User from '@/app/com/main/module/business/user/bean/User';
import Content from '@/app/com/common/chat/Content';
import app from '@/app/App';
import MessageAppendType from '@/app/com/main/module/setting/message/type/MessageAppendType';
import MessageAppendGroupSetting from '@/app/com/main/module/setting/message/MessageAppendGroupSetting';
import GroupChatDataController from "@/app/com/main/module/business/chat/controller/GroupChatDataController";

class GroupChatViewModel extends ChatViewModel {

    public groupMemberData: {
        users: User[],
    } = {
        users: [],
    };
    public groupMemberUserListMap: Map<string, User[]> = new Map<string, User[]>();

    public nodeClear() {
        this.groupMemberUserListMap.clear();
        this.groupMemberData.users = [];
    }

    public setGroup(group: Group) {
        const groupId = (group) ? group.id : '';
        this.setChat(groupId);
        this.chatData.key = groupId;
        this.chatData.avatar = group.avatar;
        this.chatData.text = group.introduce;

        const users: User[] = this.getMemberUserList(groupId);
        this.groupMemberData.users = users;
        this.data.nameVisible = true;
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

    public loadHistory() {
        let messageKey = '';
        const groupId = this.chatData.key;
        if (this.data.list && this.data.list.length > 0) {
            messageKey = this.geFirstMessageKey(groupId);
            // 历史记录时记录当前聊天界面的id
            this.cacheData.data.lastMessageKey = messageKey;

            const length = this.data.list.length;
            if (length < 500) {
                const groupChatController: GroupChatDataController = app.appContext.getMaterial(GroupChatDataController);
                groupChatController.loadHistory(groupId, messageKey, 20);
            } else {
                this.data.prompt = '更多内容请看历史记录。';
                if (!this.data.showPrompt) {
                    this.data.showPrompt = true;
                    setTimeout(() => {
                        this.data.showPrompt = false;
                    }, 3000);
                }
            }
        }
    }
}

export default new GroupChatViewModel();
