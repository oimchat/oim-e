import Content from '@/app/com/data/chat/content/Content';
import User from '@/app/com/bean/User';
import GroupMember from '@/app/com/bean/GroupMember';
import Group from '@/app/com/bean/Group';

export default class GroupChatData {
    // public messageKey: string = '';
    // public contentId: string = '';
    // public groupId: string = '';
    public group: Group = new Group();
    public user: User = new User();
    public groupMember: GroupMember = new GroupMember();
    public content: Content = new Content();
}
