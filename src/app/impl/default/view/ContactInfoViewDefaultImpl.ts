import ContactInfoView from '@/app/com/main/module/business/contact/view/ContactInfoView';
import User from '@/app/com/main/module/business/user/bean/User';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';

export default class ContactInfoViewDefaultImpl extends AbstractMaterial implements ContactInfoView {

    public isVisible(): boolean {
        return false;
    }

    public setUser(user: User): void {
        // no
    }

    public setVisible(visible: boolean): void {
        // no
    }
}
