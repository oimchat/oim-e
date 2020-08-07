import Content from '@/app/com/common/chat/Content';
import UserBase from '@/app/com/main/module/business/user/bean/UserBase';

export default class ContentData {
    public id: string = '';
    public key: string = '';
    public isOwn: boolean = false;
    public name: string = '';
    public user: UserBase = new UserBase();
    /**
     * 0:发送中 1:发送成功 2:发送失败
     */
    public status: number = 0;
    public nameVisible: boolean = false;
    public timeVisible: boolean = true;
    public content: Content = new Content();
}
