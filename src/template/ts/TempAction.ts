import {MethodMapping} from '@/app/base/action/annotation/ActionDecorator';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import PersonalService from '@/app/com/main/module/business/personal/service/PersonalService';
import User from '@/app/com/main/module/business/user/bean/User';

export default class TempAction extends AbstractMaterial {

    private static action: string = '';

    @MethodMapping(TempAction, TempAction.action, '')
    public setUserData(data: any): void {
        if (data && data.body) {
            const user: User = data.body;
            if (user) {
                const ps: PersonalService = this.appContext.getMaterial(PersonalService);
                ps.setUser(user);
            }
        }
    }
}

