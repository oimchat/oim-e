import {MethodMapping} from '@/app/base/annotation/ActionDecorator';
import AbstractMaterial from '@/app/base/AbstractMaterial';
import PersonalService from '@/app/com/main/service/PersonalService';
import Client from '@/app/base/message/client/Client';

export default class SystemAuthAction extends AbstractMaterial {

    private static action: string = '1.0.002';

    @MethodMapping(SystemAuthAction, SystemAuthAction.action, '1.2.0001')
    public otherOnline(data: any): void {
        if (data && data.body) {
            const client: Client = data.body.client;
            const offline: boolean = data.body.currentOffline;
            if (client) {
                const ps: PersonalService = this.appContext.getMaterial(PersonalService);
                ps.otherOnline(offline, client);
            }
        }
    }
}

