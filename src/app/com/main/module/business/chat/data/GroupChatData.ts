import Content from '@/app/com/common/chat/Content';
import User from '@/app/com/main/module/business/user/bean/User';
import GroupMember from '@/app/com/main/module/business/group/bean/GroupMember';
import Group from '@/app/com/main/module/business/group/bean/Group';

export default class GroupChatData {
    // public messageKey: string = '';
    // public contentId: string = '';
    // public groupId: string = '';
    public group: Group = new Group();
    public user: User = new User();
    public groupMember: GroupMember = new GroupMember();
    public content: Content = new Content();
}
