import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import Group from '@/app/com/main/module/business/group/bean/Group';
import Content from '@/app/com/common/chat/Content';
import groupChatViewModel from '@/platform/vue/view/model/GroupChatViewModel';
import GroupRelationBox from '@/app/com/main/module/business/group/box/GroupRelationBox';
import GroupInfoUtil from '@/app/com/main/common/util/GroupInfoUtil';
import GroupChatView from '@/app/com/main/module/business/chat/view/GroupChatView';
import User from '@/app/com/main/module/business/user/bean/User';
import GroupMemberService from '@/app/com/main/module/business/group/service/GroupMemberService';


export default class GroupChatViewImpl extends AbstractMaterial implements GroupChatView {

    public setGroup(group: Group): void {
        groupChatViewModel.setGroup(group);
        let name = '';
        if (group) {
            const groupId = group.id;
            const groupListBox: GroupRelationBox = this.appContext.getMaterial(GroupRelationBox);
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

    public setVisible(visible: boolean): void {
        // no
    }

    public isVisible(): boolean {
        // no
        return false;
    }
}
