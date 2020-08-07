import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Message from '@/app/base/message/Message';
import ContactAddApplyData from '@/app/com/main/module/business/contact/data/ContactAddApplyData';
import ContactVerifyAnswer from '@/app/com/main/module/business/contact/data/ContactVerifyAnswer';
import ContactSender from '@/app/com/main/module/business/contact/sender/ContactSender';
import Page from '@/app/com/common/data/Page';
import ContactAddHandleData from '@/app/com/main/module/business/contact/data/ContactAddHandleData';
import ContactAddApplyQuery from '@/app/com/main/module/business/contact/data/ContactAddApplyQuery';
import ContactAddApplyService from '@/app/com/main/module/business/contact/service/ContactAddApplyService';
import ContactAddApplyEntityCase from '@/app/com/main/module/business/contact/data/ContactAddApplyEntityCase';

export default class ContactAddApplyController extends AbstractMaterial {


    public queryApplyDataReceiveList(query: ContactAddApplyQuery,
                                     page: Page,
                                     back: (p: Page, applicants: ContactAddApplyEntityCase[]) => void): void {
        const service: ContactAddApplyService = this.appContext.getMaterial(ContactAddApplyService);
        service.queryApplyDataReceiveList(query, page, back);
    }

    public applyHandle(handle: ContactAddHandleData, back?: DataBackAction): void {
        const contactSender: ContactSender = this.appContext.getMaterial(ContactSender);
        contactSender.applyHandle(handle, back);
    }
}
