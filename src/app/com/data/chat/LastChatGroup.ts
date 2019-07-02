import UserChatHistory from '@/app/com/data/chat/UserChatHistory';
import Content from '@/app/com/data/chat/content/Content';
import Group from '@/app/com/bean/Group';
import User from '@/app/com/bean/User';

export default class LastChatUser {
    public group: Group = new Group();
    public user: User = new User();
    public messageKey: string = '';
    public contentId: string = '';
    public content: Content = new Content();
}
