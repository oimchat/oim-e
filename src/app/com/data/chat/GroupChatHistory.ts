import Content from '@/app/com/data/chat/content/Content';
import User from '@/app/com/bean/User';

export default class GroupChatHistory {
    public messageKey: string = '';
    public contentId: string = '';
    public content: Content = new Content();
    public groupId: string = '';
    public user: User = new User();
}
