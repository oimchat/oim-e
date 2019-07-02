import Content from '@/app/com/data/chat/content/Content';
import User from '@/app/com/bean/User';

export default class ContentData {
    public key: string = '';
    public isOwn: boolean = false;
    public showName: string = '';
    public user: User = new User();
    /**
     * 0:发送中 1:发送成功 2:发送失败
     */
    public status: number = 0;
    public content: Content = new Content();
}
