import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import ContactAddApplyListViewService
    from '@/app/com/main/module/business/contact/service/ContactAddApplyListViewService';
import SystemInformationService from '@/app/com/client/module/message/service/SystemInformationService';
import ApplyHandleInformType from '@/app/com/main/data/ApplyHandleInformType';

export default class ContactInformationConverge extends AbstractMaterial {
    public addApplyInformation(count: number): void {

        const contactAddApplyListViewService: ContactAddApplyListViewService = this.appContext.getMaterial(ContactAddApplyListViewService);
        const systemInformationService: SystemInformationService = this.appContext.getMaterial(SystemInformationService);
        systemInformationService.inform(
            ApplyHandleInformType.ContactAddApply,
            '添加好友请求',
            ApplyHandleInformType.ContactAddApply,
            (key, value) => {
                contactAddApplyListViewService.show();
                systemInformationService.showByType(key);
            }, (key, value) => {
                systemInformationService.delete(key);
            }, true, count);
    }
}
