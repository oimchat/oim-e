import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import Group from '@/app/com/bean/Group';
import Content from '@/app/com/data/chat/content/Content';
import groupChatViewModel from '@/impl/data/GroupChatViewModel';
import GroupListBox from '@/app/com/main/box/GroupListBox';
import GroupInfoUtil from '@/app/com/main/util/GroupInfoUtil';
import GroupInfoService from '@/app/com/main/service/GroupInfoService';
import GroupChatView from '@/app/com/main/view/GroupChatView';
import User from '@/app/com/bean/User';
import GroupMemberService from '@/app/com/main/service/GroupMemberService';

export default class GroupChatViewImpl extends AbstractMaterial implements GroupChatView {

    public setGroup(group: Group): void {
        groupChatViewModel.setGroup(group);
        let name = '';
        if (group) {
            const groupId = group.id;
            const groupListBox: GroupListBox = this.appContext.getMaterial(GroupListBox);
            const list = groupListBox.getGroupInGroupRelationListByGroupId(groupId);

            if (list && list.length > 0) {
                const relation = list[0];
                name = relation.remark;
            }

            if (!name || '' === name) {
                name = GroupInfoUtil.getShowName(group);
            }
        }
        groupChatViewModel.setName(name);
    }

    public chat(isReceive: boolean, isOwn: boolean, group: Group, chatUser: User, content: Content): void {
        const groupId = group.id;
        const groupService: GroupMemberService = this.appContext.getMaterial(GroupMemberService);
        const name = groupService.getUserShowName(groupId, chatUser);
        groupChatViewModel.insertLast(isReceive, isOwn, groupId, name, chatUser, content);
    }


    public insertBefore(isReceive: boolean, isOwn: boolean, key: string, chatUser: User, content: Content): void {
        const groupService: GroupMemberService = this.appContext.getMaterial(GroupMemberService);
        const name = groupService.getUserShowName(key, chatUser);
        groupChatViewModel.insertBefore(isReceive, isOwn, key, name, chatUser, content);
    }

    public insertLast(isReceive: boolean, isOwn: boolean, key: string, chatUser: User, content: Content): void {
        const groupService: GroupMemberService = this.appContext.getMaterial(GroupMemberService);
        const name = groupService.getUserShowName(key, chatUser);
        groupChatViewModel.insertLast(isReceive, isOwn, key, name, chatUser, content);
    }

    public isShowing(key: string): boolean {
        const showing = (groupChatViewModel.getChatKey() === key);
        return showing;
    }
}
