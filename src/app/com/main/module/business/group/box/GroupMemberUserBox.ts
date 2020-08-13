import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import BaseUtil from '@/app/lib/util/BaseUtil';
import User from '@/app/com/main/module/business/user/bean/User';
import ObjectUtil from '@/app/common/util/ObjectUtil';

export default class GroupMemberUserBox extends AbstractMaterial {

    /*** 成员列表<groupId,Map<userId, User>>*/
    private groupMemberListMap: Map<string, Map<string, User>> = new Map<string, Map<string, User>>();
    private groupMemberUserListMap: Map<string, User[]> = new Map<string, User[]>();

    public updateUser(user: User): void {
        const userId = user.id;
        const usersMap = this.groupMemberListMap;

        for (const map of usersMap.values()) {
            const u = map.get(userId);
            if (u) {
                ObjectUtil.copyByTargetKey(u, user);
            }
        }
    }

    public putGroupMemberUser(groupId: string, user: User): void {
        const userId = user.id;

        const groupMemberMap = this.getGroupMemberUserMapByGroupId(groupId);
        const u = groupMemberMap.get(userId);
        if (u) {
            ObjectUtil.copyByTargetKey(u, user);
        } else {
            groupMemberMap.set(userId, user);
        }
        const list = this.getOrCreateMemberUserList(groupId);
        let has = false;
        list.forEach((value, index) => {
            if (value.id === userId) {
                has = true;
                return;
            }
        });
        if (!has) {
            list.push(user);
        }
    }

    public getGroupMemberUserMapByGroupId(groupId: string): Map<string, User> {
        let map = this.groupMemberListMap.get(groupId);
        if (!map) {
            map = new Map<string, User>();
            this.groupMemberListMap.set(groupId, map);
        }
        return map;
    }

    public getGroupMemberUserListByGroupId(groupId: string): User[] {
        return this.getGroupMemberUserList(groupId);
    }

    public getGroupMemberUser(groupId: string, userId: string): User {
        let user: any;
        const map = this.groupMemberListMap.get(groupId);
        if (map) {
            user = map.get(userId);
        }
        return user;
    }

    public putGroupMemberUserList(groupId: string, list: User[]): void {
        if (groupId && list) {
            for (const data of list) {
                this.putGroupMemberUser(groupId, data);
            }
        }
    }

    public removeGroupMemberUserList(groupId: string): User[] {
        const map: any = this.groupMemberListMap.get(groupId);
        this.groupMemberListMap.delete(groupId);
        this.groupMemberUserListMap.delete(groupId);
        const list: User[] = [];
        if (!BaseUtil.isEmpty(map)) {
            const values = (map.values());
            for (const data of values) {
                list.push(data);
            }
        }
        return list;
    }

    public removeGroupMemberUser(groupId: string, userId: string) {
        let user: any;
        const map = this.groupMemberListMap.get(groupId);
        if (map) {
            user = map.get(userId);
            map.delete(userId);
            if (map.size === 0) {
                this.groupMemberListMap.delete(groupId);
            }
        }

        const list = this.getGroupMemberUserList(groupId);
        if (list) {
            let index = -1;
            for (const u of list) {
                if (u.id === user.id) {
                    index = list.indexOf(u);
                }
            }

            if (index > -1) {
                list.splice(index, 1);
            }
        }
        return user;
    }


    public getGroupMemberUserSize(categoryId: string): number {
        const map: any = this.groupMemberListMap.get(categoryId);
        return BaseUtil.isEmpty(map) ? 0 : map.size;
    }


    public clearGroupMemberUser(): void {
        this.groupMemberListMap.clear();
    }

    /**
     *
     * @param groupId
     * @param userId
     */
    public inMemberList(groupId: string, userId: string): boolean {
        let has = false;
        const map = this.groupMemberListMap.get(groupId);
        if (map) {
            has = map.has(userId);
        }
        return has;
    }

    public getGroupMemberUserList(groupId: string): User[] {
        let list: User[] = [];
        const users = this.groupMemberUserListMap.get(groupId);
        if (users) {
            list = users;
        }
        return list;
    }

    private getOrCreateMemberUserList(groupId: string): User[] {
        let list = this.groupMemberUserListMap.get(groupId);
        if (!list) {
            list = [];
            this.groupMemberUserListMap.set(groupId, list);
        }
        return list;
    }
}
