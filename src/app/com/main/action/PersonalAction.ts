import {MethodMapping} from '@/app/base/annotation/ActionDecorator';
import AbstractMaterial from '@/app/base/AbstractMaterial';
import PersonalService from '@/app/com/main/service/PersonalService';
import User from '@/app/com/bean/User';
import PersonalSender from '@/app/com/main/sender/PersonalSender';
import Client from '@/app/base/message/client/Client';

export default class PersonalAction extends AbstractMaterial {

    private static action: string = '1.1.001';

    @MethodMapping(PersonalAction, PersonalAction.action, '1.1.0007')
    public setUser(data: any): void {
        if (data && data.body) {
            const user: User = data.body.user;
            if (user) {
                const ps: PersonalService = this.appContext.getMaterial(PersonalService);
                ps.setUser(user);
            }
        }
    }

    @MethodMapping(PersonalAction, PersonalAction.action, '1.2.0001')
    public otherOnline(data: any): void {
        if (data && data.body) {
            const client: Client = data.body.client;
            const offline: boolean = data.body.offline;
            if (client) {
                const ps: PersonalService = this.appContext.getMaterial(PersonalService);
                ps.otherOnline(offline, client);
            }
        }
    }

    @MethodMapping(PersonalAction, PersonalAction.action, '1.2.0002')
    public update(data: any): void {
        if (data && data.body) {
            const ps: PersonalSender = this.appContext.getMaterial(PersonalSender);
            ps.getUser();
        }
    }

    @MethodMapping(PersonalAction, PersonalAction.action, '1.2.0003')
    public updatePassword(data: any): void {
        if (data && data.body) {
            // TODO
        }
    }

    @MethodMapping(PersonalAction, PersonalAction.action, '1.2.0004')
    public updateHead(data: any): void {
        if (data && data.body) {
            const ps: PersonalSender = this.appContext.getMaterial(PersonalSender);
            ps.getUser();
        }
    }

    @MethodMapping(PersonalAction, PersonalAction.action, '1.2.0005')
    public updateSignature(data: any): void {
        if (data && data.body) {
            const ps: PersonalSender = this.appContext.getMaterial(PersonalSender);
            ps.getUser();
        }
    }

    @MethodMapping(PersonalAction, PersonalAction.action, '1.2.0006')
    public updateStatus(data: any): void {
        if (data && data.body) {
            if (data && data.body) {
                const status: string = data.body.status;
                if (status) {
                    const ps: PersonalService = this.appContext.getMaterial(PersonalService);
                    ps.updateStatus(status);
                }
            }
        }
    }
}

