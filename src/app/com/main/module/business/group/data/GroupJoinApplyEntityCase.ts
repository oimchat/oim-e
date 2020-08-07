import User from '@/app/com/main/module/business/user/bean/User';
import GroupJoinApply from '@/app/com/main/module/business/group/bean/GroupJoinApply';
import GroupJoinVerifyAnswer from '@/app/com/main/module/business/group/bean/GroupJoinVerifyAnswer';
import Group from '@/app/com/main/module/business/group/bean/Group';

export default class GroupJoinApplyEntityCase {
    public apply: GroupJoinApply = new GroupJoinApply();
    public user: User = new User();
    public group: Group = new Group();
    public answers: GroupJoinVerifyAnswer[] = [];
}
