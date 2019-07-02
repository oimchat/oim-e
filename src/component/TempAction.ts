import {MethodMapping} from '@/app/base/annotation/ActionDecorator';
import AbstractMaterial from '@/app/base/AbstractMaterial';
import PersonalService from '@/app/com/main/service/PersonalService';
import User from '@/app/com/bean/User';

export default class TempAction extends AbstractMaterial {

    private static action: string = '';

    @MethodMapping(TempAction, TempAction.action, '')
    public setUserData(data: any): void {
        if (data && data.body) {
            const user: User = data.body.user;
            if (user) {
                const ps: PersonalService = this.appContext.getMaterial(PersonalService);
                ps.setUser(user);
            }
        }
    }
}

