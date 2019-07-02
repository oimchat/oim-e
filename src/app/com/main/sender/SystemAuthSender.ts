import AbstractMaterial from '@/app/base/AbstractMaterial';
import Message from '@/app/base/message/Message';
import DataBackAction from '@/app/base/net/DataBackAction';

export default class SystemAuthSender extends AbstractMaterial {

    private action: string = '1.0.001';

    public auth(token: string, back: DataBackAction): void {
        const body: any = {
            token: '',
        };
        body.token = token;
        const m = Message.build(this.action, '1.1.0001');
        m.body = body;
        this.appContext.netServer.send(m, back);
    }
}
