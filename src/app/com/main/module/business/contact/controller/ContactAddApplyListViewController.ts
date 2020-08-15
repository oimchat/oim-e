import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import ContactAddApplyListViewService
    from '@/app/com/main/module/business/contact/service/ContactAddApplyListViewService';


export default class ContactAddApplyListViewController extends AbstractMaterial {

    public show(): void {
        const service: ContactAddApplyListViewService = this.appContext.getMaterial(ContactAddApplyListViewService);
        service.show();
    }
}
