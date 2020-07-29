import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import Message from '@/app/base/message/Message';
import DataBackAction from '@/app/base/net/DataBackAction';
import Client from '@/app/base/message/client/Client';

export default class SystemAuthSender extends AbstractMaterial {

    private action: string = '1.0.002';

    public auth(token: string, client: Client, back: DataBackAction): void {
        const body: any = {
            token: '',
            client: {},
        };
        body.token = token;
        body.client = client;
        const m = Message.build(this.action, '1.1.0001');
        m.body = body;
        this.appContext.netServer.send(m, back);
    }
}
