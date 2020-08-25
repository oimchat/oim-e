import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import BaseUtil from '@/app/lib/util/BaseUtil';
import GroupMember from '@/app/com/main/module/business/group/bean/GroupMember';
import ObjectUtil from '@/app/common/util/ObjectUtil';

export default class GroupMemberBox extends AbstractMaterial {

    /*** 成员列表<groupId,Map<userId, GroupMember>>*/
    private groupMemberListMap: Map<string, Map<string, GroupMember>> = new Map<string, Map<string, GroupMember>>();


    public putGroupMember(groupMember: GroupMember): void {
        const groupId = groupMember.groupId;
        const userId = groupMember.userId;

        const groupMemberMap = this.getOrCreateGroupMemberMapByGroupId(groupId);
        const m = groupMemberMap.get(userId);
        if (m) {
            ObjectUtil.copyByTargetKey(m, groupMember);
        } else {
            groupMemberMap.set(userId, groupMember);
        }
    }

    public getGroupMember(groupId: string, userId: string): GroupMember {
        let groupMember: any;
        const map = this.groupMemberListMap.get(groupId);
        if (map) {
            groupMember = map.get(userId);
        }
        return groupMember;
    }

    public getGroupMemberMapByGroupId(groupId: string): Map<string, GroupMember> {
        const map: any = this.groupMemberListMap.get(groupId);
        return map;
    }

    public putGroupMemberList(list: GroupMember[]): void {
        if (list) {
            for (const data of list) {
                this.putGroupMember(data);
            }
        }
    }

    public removeGroupMemberList(groupId: string): GroupMember[] {
        const map: any = this.groupMemberListMap.get(groupId);
        this.groupMemberListMap.delete(groupId);
        const list: GroupMember[] = [];
        if (!BaseUtil.isEmpty(map)) {
            const values = (map.values());
            for (const data of values) {
                list.push(data);
            }
        }
        return list;
    }

    public removeGroupMember(groupId: string, userId: string) {
        let groupMember: any;
        const map = this.groupMemberListMap.get(groupId);
        if (map) {
            groupMember = map.get(userId);
            map.delete(userId);
            if (map.size === 0) {
                this.groupMemberListMap.delete(groupId);
            }
        }
        return groupMember;
    }

    public getGroupMemberList(groupId: string): GroupMember[] {
        const list: GroupMember[] = [];
        const map = this.groupMemberListMap.get(groupId);
        if (map) {
            const values = map.values();
            for (const data of values) {
                list.push(data);
            }
        }
        return list;
    }

    public getGroupMemberSize(groupId: string): number {
        const map: any = this.groupMemberListMap.get(groupId);
        return BaseUtil.isEmpty(map) ? 0 : map.size;
    }

    public getPosition(groupId: string, userId: string): string {
        let position = GroupMember.POSITION_NORMAL;
        const map = this.groupMemberListMap.get(groupId);
        if (map) {
            const gm = map.get(userId);
            if (gm) {
                position = gm.position;
            }
        }
        return position;
    }

    public clearGroupMember(): void {
        this.groupMemberListMap.clear();
    }

    public hasGroup(groupId: string): boolean {
        const map: Map<string, GroupMember> | undefined = this.groupMemberListMap.get(groupId);
        const hasGroup = this.groupMemberListMap.has(groupId);
        const hasMember: boolean = (map) ? map.size > 0 : false;
        return (hasGroup && hasMember);
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

    public updatePosition(groupId: string, userId: string, position: string) {
        const m = this.getGroupMember(groupId, userId);
        if (m) {
            m.position = position;
        }
    }

    private getOrCreateGroupMemberMapByGroupId(groupId: string): Map<string, GroupMember> {
        let map = this.groupMemberListMap.get(groupId);
        if (!map) {
            map = new Map<string, GroupMember>();
            this.groupMemberListMap.set(groupId, map);
        }
        return map;
    }
}
