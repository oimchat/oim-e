import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import BaseUtil from '@/app/lib/util/BaseUtil';
import User from '@/app/com/bean/User';

export default class GroupMemberUserBox extends AbstractMaterial {

    /*** 成员列表<groupId,Map<userId, User>>*/
    private groupMemberListMap: Map<string, Map<string, User>> = new Map<string, Map<string, User>>();


    public putGroupMemberUser(groupId: string, user: User): void {
        const userId = user.id;

        const groupMemberMap = this.getGroupMemberUserMapByGroupId(groupId);
        groupMemberMap.set(userId, user);
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
        const groupMemberMap = this.getGroupMemberUserMapByGroupId(groupId);
        const list: User[] = [];
        const values = groupMemberMap.values();
        for (const data of values) {
            list.push(data);
        }
        return list;
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
        return user;
    }

    public getGroupMemberUserList(groupId: string): User[] {
        const list: User[] = [];
        const map = this.groupMemberListMap.get(groupId);
        if (map) {
            const values = map.values();
            for (const data of values) {
                list.push(data);
            }
        }
        return list;
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
}
