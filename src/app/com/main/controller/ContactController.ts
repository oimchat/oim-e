import AbstractMaterial from '@/app/base/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Message from '@/app/base/message/Message';
import ContactAddApplyData from '@/app/com/data/ContactAddApplyData';
import ContactVerifyAnswer from '@/app/com/data/ContactVerifyAnswer';
import ContactSender from '@/app/com/main/sender/ContactSender';
import Page from '@/app/com/data/Page';
import ContactAddHandleData from '@/app/com/data/ContactAddHandleData';
import ContactAddApplyQuery from '@/app/com/data/ContactAddApplyQuery';

export default class ContactController extends AbstractMaterial {

    public getContactAddVerifySetting(userId: string, back?: DataBackAction, parallel?: boolean): void {
        const contactSender: ContactSender = this.appContext.getMaterial(ContactSender);
        contactSender.getContactAddVerifySetting(userId, back, parallel);
    }

    public sendAddRequest(apply: ContactAddApplyData, answerList: ContactVerifyAnswer[], back?: DataBackAction, parallel?: boolean): void {
        const contactSender: ContactSender = this.appContext.getMaterial(ContactSender);
        contactSender.sendAddRequest(apply, answerList, back, parallel);
    }

    public getApplyCount(query: ContactAddApplyQuery, back?: DataBackAction): void {
        const contactSender: ContactSender = this.appContext.getMaterial(ContactSender);
        contactSender.getApplyCount(query, back);
    }

    public getApplyList(query: ContactAddApplyQuery, page: Page, back?: DataBackAction): void {
        const contactSender: ContactSender = this.appContext.getMaterial(ContactSender);
        contactSender.getApplyList(query, page, back);
    }

    public sendAddResponse(handle: ContactAddHandleData, back?: DataBackAction): void {
        const contactSender: ContactSender = this.appContext.getMaterial(ContactSender);
        contactSender.sendAddResponse(handle, back);
    }
}
