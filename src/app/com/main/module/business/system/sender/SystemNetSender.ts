import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import Message from '@/app/base/message/Message';
import AbstractSender from '@/app/com/main/common/base/sender/AbstractSender';

export default class SystemNetSender extends AbstractSender  {

    private action: string = '1.0.001';

    public heartbeat(): void {
        const m = Message.build(this.action, '1.1.0001');
        m.body = {};
        this.send(m);
    }
}
