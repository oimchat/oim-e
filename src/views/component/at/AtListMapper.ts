import PopupMapper from '@/views/common/popup/PopupMapper';
import DocumentUtil from '@/common/web/util/DocumentUtil';
import User from '@/app/com/main/module/business/user/bean/User';
import GroupMember from '@/app/com/main/module/business/group/bean/GroupMember';
import App from '@/app/App';
import GroupMemberUserBox from '@/app/com/main/module/business/group/box/GroupMemberUserBox';
import GroupMemberBox from '@/app/com/main/module/business/group/box/GroupMemberBox';
import GroupMemberUserController from '@/app/com/main/module/business/group/controller/GroupMemberUserController';
import app from '@/app/App';

export default class AtListMapper {
    public popupMapper: PopupMapper = new PopupMapper();
    public findUsers: Array<{ user: User, avatar: string, remark: string, name: string }> = [];
    public users: User[] = [];
    public groupMemberMap: Map<string, GroupMember> = new Map<string, GroupMember>();
    public onAt: (userId: string, name: string, node: Node) => void = (() => {
        // no
    });
    private node: Node | any;

    public handleInput(evt: InputEvent, e: Element) {
        const data = DocumentUtil.getCursorLocation(e);
        const textValue = this.getTextValue(data.text);
        if (textValue) {
            // console.log(textValue);
            this.handleFind(textValue);
            if (this.findUsers && this.findUsers.length > 0) {
                this.popupMapper.x = data.x;
                this.popupMapper.y = data.y - 120;
                this.node = data.node;
                this.popupMapper.show = true;
            } else {
                this.popupMapper.show = false;
            }
        } else {
            this.popupMapper.show = false;
        }
    }

    public setGroupId(groupId: string) {

        const own = this;
        const controller: GroupMemberUserController = app.appContext.getMaterial(GroupMemberUserController);
        controller.loadAllMemberUserList(groupId, (
            success,
            memberList,
            userList,
            message) => {
            const groupMemberUserBox: GroupMemberUserBox = App.appContext.getMaterial(GroupMemberUserBox);
            const groupMemberBox: GroupMemberBox = App.appContext.getMaterial(GroupMemberBox);
            const users = groupMemberUserBox.getGroupMemberUserList(groupId);
            const groupMemberMap = groupMemberBox.getGroupMemberMapByGroupId(groupId);
            if (users) {
                own.users = users;
            } else {
                own.clearUsers();
            }

            if (groupMemberMap) {
                own.groupMemberMap = groupMemberMap;
            } else {
                own.clearMemberMap();
            }
        });
    }

    public handleFind(text: string) {
        if (text) {
            text = text.replace('@', '');
            this.findUsers = this.findUserList(text);
            // console.log(this.findUsers);
        }
    }

    public findUserList(text: string) {
        const maxSize = 20;
        const list: Array<{ user: User, avatar: string, name: string, remark: string }> = [];
        const allList = this.users;
        const map = this.groupMemberMap;
        let size = 0;

        for (const ud of allList) {

            const id = ud.id;
            const account = ud.account;
            const email = ud.email;
            const mobile = ud.mobile;
            const name = ud.name;
            const nickname = ud.nickname;
            const numberName = ud.number + '';
            let groupNickname = '';
            if (map) {
                const m = map.get(id);
                if (m) {
                    groupNickname = m.nickname;
                }
            }
            let mark = false;

            if (!text) {
                mark = true;
            }

            if (null != account && !mark) {
                mark = (account.indexOf(text) !== -1);
            }
            if (null != email && !mark) {
                mark = (email.indexOf(text) !== -1);
            }
            if (null != mobile && !mark) {
                mark = (mobile.indexOf(text) !== -1);
            }
            if (null != name && !mark) {
                mark = (name.indexOf(text) !== -1);
            }
            if (null != nickname && !mark) {
                mark = (nickname.indexOf(text) !== -1);
            }
            if (null != groupNickname && !mark) {
                mark = (groupNickname.indexOf(text) !== -1);
            }

            let showName = '';
            let atName = '';
            if (groupNickname) {
                showName = groupNickname;
                atName = groupNickname;
            }

            if (showName) {
                if (nickname) {
                    showName = showName + '(' + nickname + ')';
                } else {
                    showName = showName + '(' + account + ')';
                }
            } else if (nickname) {
                atName = nickname;
                showName = nickname;
                showName = showName + '(' + account + ')';
            } else {
                atName = account;
                showName = account + '(' + numberName + ')';
            }

            if (!showName) {
                showName = numberName;
            }
            if (!atName) {
                atName = numberName;
            }

            if (mark) {
                const data = {user: ud, avatar: ud.avatar, remark: showName, name: atName};
                list.push(data);
                size++;
            }

            if (size > maxSize) {
                return list;
            }
        }
        return list;
    }


    public handleAt(userId: string, name: string) {
        if (typeof this.onAt === 'function') {
            this.onAt(userId, name, this.node);
        }
    }

    private clearUsers(): void {
        this.users = [];
    }

    private clearMemberMap(): void {
        this.groupMemberMap = new Map<string, GroupMember>();
    }

    private getTextValue(text: string) {
        let value = '';
        const at = '@';
        if (text) {
            const length = text.length;
            const lastIndex = text.lastIndexOf(at);
            if (lastIndex > -1 && lastIndex < length) {
                value = text.substring(lastIndex, length);
            }
        }
        return value;
    }
}
