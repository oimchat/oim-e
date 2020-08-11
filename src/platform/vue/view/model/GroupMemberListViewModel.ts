import User from '@/app/com/main/module/business/user/bean/User';
import GroupMember from '@/app/com/main/module/business/group/bean/GroupMember';

class GroupMemberListViewModel {

    public users: User[] = [];
    public groupMemberUserListMap: Map<string, User[]> = new Map<string, User[]>();

    public showGroupMembers(groupId: string) {
        const users: User[] = this.getMemberUserList(groupId);
        this.users = users;
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

export default new GroupMemberListViewModel();
