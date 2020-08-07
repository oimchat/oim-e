import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Message from '@/app/base/message/Message';
import ContactAddApplyData from '@/app/com/main/module/business/contact/data/ContactAddApplyData';
import ContactVerifyAnswer from '@/app/com/main/module/business/contact/data/ContactVerifyAnswer';
import ContactSender from '@/app/com/main/module/business/contact/sender/ContactSender';
import Page from '@/app/com/common/data/Page';
import ContactAddHandleData from '@/app/com/main/module/business/contact/data/ContactAddHandleData';
import ContactAddApplyQuery from '@/app/com/main/module/business/contact/data/ContactAddApplyQuery';

export default class ContactController extends AbstractMaterial {

    public getContactAddVerifySetting(userId: string, back?: DataBackAction, parallel?: boolean): void {
        const contactSender: ContactSender = this.appContext.getMaterial(ContactSender);
        contactSender.getContactAddVerifySetting(userId, back, parallel);
    }

    public sendAddRequest(apply: ContactAddApplyData, answerList: ContactVerifyAnswer[], back?: DataBackAction, parallel?: boolean): void {
        const contactSender: ContactSender = this.appContext.getMaterial(ContactSender);
        contactSender.sendAddApply(apply, answerList, back, parallel);
    }

    public sendAddResponse(handle: ContactAddHandleData, back?: DataBackAction): void {
        const contactSender: ContactSender = this.appContext.getMaterial(ContactSender);
        contactSender.applyHandle(handle, back);
    }
}
