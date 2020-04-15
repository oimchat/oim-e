import AbstractMaterial from '@/app/base/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import SystemAuthSender from '@/app/com/main/sender/SystemAuthSender';
import Client from '@/app/base/message/client/Client';

export default class SystemAuthManager extends AbstractMaterial {

    public auth(token: string, client: Client, back: DataBackAction): void {
        const sas: SystemAuthSender = this.appContext.getMaterial(SystemAuthSender);
        sas.auth(token, client, back);
    }
}
