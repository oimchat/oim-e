import BaseGroupInfoViewModel from "@/platform/vue/view/model/BaseGroupInfoViewModel";
import GroupRelation from "@/app/com/bean/GroupRelation";
import PersonalGroupMemberListBox from "@/app/com/main/box/PersonalGroupMemberListBox";
import app from "@/app/App";
import GroupMember from "@/app/com/bean/GroupMember";
import User from "@/app/com/bean/User";
import groupChatViewModel from "@/impl/data/GroupChatViewModel";
import Group from "@/app/com/bean/Group";

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
        const personalGroupMemberListBox: PersonalGroupMemberListBox = app.appContext.getMaterial(PersonalGroupMemberListBox);
        const position = personalGroupMemberListBox.getPosition(groupId);
        this.isOwner = (GroupMember.POSITION_OWNER === position);
    }

    private loadList() {
        const groupId = this.groupId;
        this.users = groupChatViewModel.getMemberUserList(groupId);
    }
}

export default new GroupInfoViewModel();