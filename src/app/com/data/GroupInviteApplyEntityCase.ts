import User from '@/app/com/bean/User';
import GroupInviteApply from '@/app/com/bean/GroupInviteApply';
import GroupJoinVerifyAnswer from '@/app/com/bean/GroupJoinVerifyAnswer';
import Group from '@/app/com/bean/Group';

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
