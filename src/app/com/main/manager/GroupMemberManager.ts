import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import User from '@/app/com/bean/User';
import UserBox from '@/app/com/main/box/UserBox';
import BaseUtil from '@/app/lib/util/BaseUtil';
import UserInfoUtil from '@/app/com/main/util/UserInfoUtil';
import GroupMemberBox from '@/app/com/main/box/GroupMemberBox';

export default class GroupMemberManager extends AbstractMaterial {

    public getUserShowNameById(groupId: string, userId: string): string {
        const userBox: UserBox = this.appContext.getMaterial(UserBox);
        return this.getUserShowName(groupId, userBox.getUser(userId));
    }

    public getUserShowName(groupId: string, user: User): string {
        let name = '';
        if (user) {
            const userId: string = user.id;
            const box: GroupMemberBox = this.appContext.getMaterial(GroupMemberBox);
            const groupMember = box.getGroupMember(groupId, userId);
            if (groupMember) {
                name = groupMember.nickname;
            }
            if (BaseUtil.isEmpty(name)) {
                name = UserInfoUtil.getShowName(user);
            }
        }
        return name;
    }
}
