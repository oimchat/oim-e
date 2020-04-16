import AbstractMaterial from '@/app/base/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Message from '@/app/base/message/Message';
import ContactAddApplyData from '@/app/com/data/ContactAddApplyData';
import ContactVerifyAnswer from '@/app/com/data/ContactVerifyAnswer';
import ContactSender from '@/app/com/main/sender/ContactSender';
import Page from '@/app/com/data/common/Page';
import ContactAddHandleData from '@/app/com/data/ContactAddHandleData';
import ContactAddApplyQuery from '@/app/com/data/ContactAddApplyQuery';
import ContactAddApplyService from '@/app/com/main/service/ContactAddApplyService';
import ContactAddApplyEntityCase from '@/app/com/data/ContactAddApplyEntityCase';

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
