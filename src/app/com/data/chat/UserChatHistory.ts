import Content from '@/app/com/data/chat/content/Content';
import User from '@/app/com/bean/User';

export default class UserChatHistory {
    public messageKey: string = '';
    public contentId: string = '';
    public content: Content = new Content();
    public receiveUser: User = new User();
    public sendUser: User = new User();
}
