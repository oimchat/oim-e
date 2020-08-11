import BaseGroupInfoViewModel from '@/platform/vue/view/model/BaseGroupInfoViewModel';
import GroupRelation from '@/app/com/main/module/business/group/bean/GroupRelation';
import GroupMemberListOfPersonalBox from '@/app/com/main/module/business/group/box/GroupMemberListOfPersonalBox';
import app from '@/app/App';
import GroupMember from '@/app/com/main/module/business/group/bean/GroupMember';
import User from '@/app/com/main/module/business/user/bean/User';
import groupChatViewModel from '@/platform/vue/view/model/GroupChatViewModel';
import Group from '@/app/com/main/module/business/group/bean/Group';

class GroupInfoViewModel extends BaseGroupInfoViewModel {

    public relation: GroupRelation = new GroupRelation();
    public isOwner: boolean = false;
    public isJoin: boolean = false;

    public users: User[] = [];

    public setGroup(group: Group) {
        super.setGroup(group);
        this.loadList();
    }

    public setRelation(relation: GroupRelation) {
        if (relation) {
            this.relation = relation;
            this.isJoin = true;
        } else {
            this.relation = new GroupRelation();
            this.isJoin = false;
        }
    }

    public groupChange(): void {
        const groupId = this.groupId;
        const personalGroupMemberListBox: GroupMemberListOfPersonalBox = app.appContext.getMaterial(GroupMemberListOfPersonalBox);
        const position = personalGroupMemberListBox.getPosition(groupId);
        this.isOwner = (GroupMember.POSITION_OWNER === position);
    }

    private loadList() {
        const groupId = this.groupId;
        this.users = groupChatViewModel.getMemberUserList(groupId);
    }
}

export default new GroupInfoViewModel();
