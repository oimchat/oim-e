import Content from '@/app/com/common/chat/Content';
import UserBase from '@/app/com/main/module/business/user/bean/UserBase';
import ContentWrap from '@/common/vue/data/content/ContentWrap';

export default class MessageContentWrap extends ContentWrap {

    public id: string = '';
    public key: string = '';
    public isOwn: boolean = false;
    public name: string = '';
    public avatar: string = '';
    public user: UserBase = new UserBase();
    /**
     * 0:发送中 1:发送成功 2:发送失败
     */
    public status: number = 0;
    public nameVisible: boolean = false;
    public timeVisible: boolean = true;
    public timeText: string = '';
    public content: Content = new Content();

    public getTimestamp(): number {
        const content: Content = this.content;
        return content ? content.timestamp : 0;
    }
}
