import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import GroupMember from '@/app/com/main/module/business/group/bean/GroupMember';

export default class GroupMemberListOfPersonalBox extends AbstractMaterial {

    /*** 成员列表<groupId,GroupMember>*/
    private groupMemberMap: Map<string, GroupMember> = new Map<string, GroupMember>();

    public putGroupMember(groupMember: GroupMember): void {
        const groupId = groupMember.groupId;
        const userId = groupMember.userId;

        this.groupMemberMap.set(groupId, groupMember);
    }

    public putGroupMemberList(list: GroupMember[]): void {
        if (list) {
            for (const data of list) {
                this.putGroupMember(data);
            }
        }
    }

    public removeGroupMember(groupId: string) {
        const groupMember: any = this.groupMemberMap.get(groupId);
        this.groupMemberMap.delete(groupId);
        return groupMember;
    }

    public getGroupMember(groupId: string): GroupMember {
        const gm: any = this.groupMemberMap.get(groupId);
        return gm;
    }

    public getNickname(groupId: string): string {
        let nickname = '';
        const gm = this.groupMemberMap.get(groupId);
        if (gm) {
            nickname = gm.nickname;
        }
        return nickname;
    }

    public getPosition(groupId: string): string {
        let position = GroupMember.POSITION_NORMAL;
        const gm = this.groupMemberMap.get(groupId);
        if (gm) {
            position = gm.position;
        }
        return position;
    }

    public updatePosition(groupId: string, position: string) {
        const gm = this.groupMemberMap.get(groupId);
        if (gm) {
            gm.position = position;
        }
    }

    public isOwner(groupId: string): boolean {
        const position = this.getPosition(groupId);
        const mark: boolean = GroupMember.POSITION_OWNER === (position);
        return mark;
    }

    public isNormal(groupId: string): boolean {
        const position = this.getPosition(groupId);
        const mark: boolean = GroupMember.POSITION_NORMAL === (position);
        return mark;
    }

    public isAdmin(groupId: string): boolean {
        const position = this.getPosition(groupId);
        const mark: boolean = GroupMember.POSITION_ADMIN === (position);
        return mark;
    }

    public clearGroupMember(): void {
        this.groupMemberMap.clear();
    }

    public inGroup(groupId: string): boolean {
        const has = this.groupMemberMap.has(groupId);
        return has;
    }
}
