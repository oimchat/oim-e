import {MethodMapping} from '@/app/base/action/annotation/ActionDecorator';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import PersonalService from '@/app/com/main/module/business/personal/service/PersonalService';
import User from '@/app/com/main/module/business/user/bean/User';
import PersonalSender from '@/app/com/main/module/business/personal/sender/PersonalSender';
import Client from '@/app/base/message/client/Client';
import auth from '@/app/common/auth/Auth';

export default class PersonalAction extends AbstractMaterial {

    private static action: string = '1.1.002';

    @MethodMapping(PersonalAction, PersonalAction.action, '1.1.0007')
    public setUser(data: any): void {
        if (data && data.body) {
            const user: User = data.body;
            if (user) {
                const ps: PersonalService = this.appContext.getMaterial(PersonalService);
                ps.setUser(user);

                auth.setUserId(user.id);
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

