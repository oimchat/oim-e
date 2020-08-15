import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import WorkViewEnum from '@/app/com/common/view/WorkViewEnum';
import ContactAddApplyListView from '@/app/com/main/module/business/contact/view/ContactAddApplyListView';


export default class ContactAddApplyListViewService extends AbstractMaterial {

    public show(): void {
        const view: ContactAddApplyListView = this.appContext.getView(WorkViewEnum.ContactAddApplyListView);
        view.setVisible(true);
    }
}
