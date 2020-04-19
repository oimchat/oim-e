import Content from '@/app/com/data/chat/content/Content';
import User from '@/app/com/bean/User';

export default class UserChatData {
    // public messageKey: string = '';
    // public contentId: string = '';
    public receiveUser: User = new User();
    public sendUser: User = new User();
    public content: Content = new Content();
}
