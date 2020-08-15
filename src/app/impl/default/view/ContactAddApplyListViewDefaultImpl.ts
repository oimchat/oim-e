import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import ContactAddApplyListView from '@/app/com/main/module/business/contact/view/ContactAddApplyListView';

export default class ContactAddApplyListViewDefaultImpl extends AbstractMaterial implements ContactAddApplyListView {

    public isVisible(): boolean {
        return false;
    }

    public setVisible(visible: boolean): void {
        // no
    }
}
