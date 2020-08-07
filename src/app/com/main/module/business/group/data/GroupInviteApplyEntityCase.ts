import User from '@/app/com/main/module/business/user/bean/User';
import GroupInviteApply from '@/app/com/main/module/business/group/bean/GroupInviteApply';
import GroupJoinVerifyAnswer from '@/app/com/main/module/business/group/bean/GroupJoinVerifyAnswer';
import Group from '@/app/com/main/module/business/group/bean/Group';

export default class GroupJoinApplyEntityCase {
    public apply: GroupInviteApply = new GroupInviteApply();
    /**
     * 发起邀请者
     */
    public inviterUser: User = new User();
    /**
     * 被邀请者
     */
    public inviteeUser: User = new User();
    public group: Group = new Group();
}
