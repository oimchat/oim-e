import BaseGroupInfoViewModel from '@/platform/vue/view/model/BaseGroupInfoViewModel';
import GroupRelation from '@/app/com/main/module/business/group/bean/GroupRelation';
import GroupMemberListOfPersonalBox from '@/app/com/main/module/business/group/box/GroupMemberListOfPersonalBox';
import app from '@/app/App';
import GroupMember from '@/app/com/main/module/business/group/bean/GroupMember';
import Group from '@/app/com/main/module/business/group/bean/Group';

class GroupInfoViewModel extends BaseGroupInfoViewModel {

    public relation: GroupRelation = new GroupRelation();
    public isOwner: boolean = false;
    public isJoin: boolean = false;

    public setGroup(group: Group) {
        super.setGroup(group);
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
}

export default new GroupInfoViewModel();
