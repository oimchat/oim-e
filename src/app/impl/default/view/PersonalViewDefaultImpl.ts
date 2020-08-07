import PersonalView from '@/app/com/main/module/business/personal/view/PersonalView';
import User from '@/app/com/main/module/business/user/bean/User';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';

export default class PersonalViewDefaultImpl extends AbstractMaterial implements PersonalView {

    public setUser(user: User): void {
        // no
    }
}
