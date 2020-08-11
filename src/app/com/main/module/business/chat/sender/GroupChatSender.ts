import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import Message from '@/app/base/message/Message';
import DataBackAction from '@/app/base/net/DataBackAction';
import Content from '@/app/com/common/chat/Content';
import AbstractSender from '@/app/com/main/common/base/sender/AbstractSender';
import UserBase from '@/app/com/main/module/business/user/bean/UserBase';

export default class GroupChatSender extends AbstractSender {

    private action: string = '2.3.001';

    public chat(userId: string, user: UserBase, groupId: string, content: Content, back?: DataBackAction): void {
        const m = Message.build(this.action, '1.1.0001');
        m.body = {};
        m.body.userId = userId;
        m.body.user = user;
        m.body.groupId = groupId;
        m.body.content = content;
        this.send(m, back);
    }
}
