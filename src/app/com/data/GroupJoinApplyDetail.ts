import User from '@/app/com/bean/User';
import GroupJoinApply from '@/app/com/bean/GroupJoinApply';
import GroupJoinVerifyAnswer from '@/app/com/bean/GroupJoinVerifyAnswer';
import Group from '@/app/com/bean/Group';

export default class GroupJoinApplyDetail {
    public apply: GroupJoinApply = new GroupJoinApply();
    public user: User = new User();
    public group: Group = new Group();
    public answerList: GroupJoinVerifyAnswer[] = [];
}
