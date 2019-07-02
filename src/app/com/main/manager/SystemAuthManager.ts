import AbstractMaterial from '@/app/base/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import SystemAuthSender from '@/app/com/main/sender/SystemAuthSender';

export default class SystemAuthManager extends AbstractMaterial {

    public auth(token: string, back: DataBackAction): void {
        const sas: SystemAuthSender = this.appContext.getMaterial(SystemAuthSender);
        sas.auth(token, back);
    }
}
