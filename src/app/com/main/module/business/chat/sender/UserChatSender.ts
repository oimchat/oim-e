import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import Message from '@/app/base/message/Message';
import DataBackAction from '@/app/base/net/DataBackAction';
import Content from '@/app/com/common/chat/Content';
import AbstractSender from '@/app/com/main/common/base/sender/AbstractSender';

export default class UserChatSender extends AbstractSender {

    private action: string = '2.2.001';

    public chat(sendUserId: string, receiveUserId: string, content: Content, back?: DataBackAction): void {
        const m = Message.build(this.action, '1.1.0001');
        m.body = {};
        m.body.sendUserId = sendUserId;
        m.body.receiveUserId = receiveUserId;
        m.body.content = content;
        this.send(m, back);
    }

    public read(sendUserId: string, receiveUserId: string, contentId: string, back?: DataBackAction): void {
        const m = Message.build(this.action, '1.1.0002');
        m.body = {};
        m.body.sendUserId = sendUserId;
        m.body.receiveUserId = receiveUserId;
        m.body.contentId = contentId;
        this.send(m, back);
    }
}
