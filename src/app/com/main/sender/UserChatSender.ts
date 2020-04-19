import AbstractMaterial from '@/app/base/AbstractMaterial';
import Message from '@/app/base/message/Message';
import DataBackAction from '@/app/base/net/DataBackAction';
import Content from '@/app/com/data/chat/content/Content';

export default class UserChatSender extends AbstractMaterial {

    private action: string = '2.2.001';

    public userChat(sendUserId: string, receiveUserId: string, content: Content, back?: DataBackAction): void {
        const m = Message.build(this.action, '1.1.0001');
        m.body = {};
        m.body.sendUserId = sendUserId;
        m.body.receiveUserId = receiveUserId;
        m.body.content = content;
        this.appContext.netServer.send(m, back);
    }
}
