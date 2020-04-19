import AbstractMaterial from '@/app/base/AbstractMaterial';
import Message from '@/app/base/message/Message';
import DataBackAction from '@/app/base/net/DataBackAction';
import Content from '@/app/com/data/chat/content/Content';

export default class GroupChatSender extends AbstractMaterial {

    private action: string = '2.3.001';

    public chat(userId: string, groupId: string, content: Content, back?: DataBackAction): void {
        const m = Message.build(this.action, '1.1.0001');
        m.body = {};
        m.body.userId = userId;
        m.body.groupId = groupId;
        m.body.content = content;
        this.appContext.netServer.send(m, back);
    }
}
