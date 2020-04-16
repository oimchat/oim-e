import AbstractMaterial from '@/app/base/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Message from '@/app/base/message/Message';
import ContactAddApplyData from '@/app/com/data/ContactAddApplyData';
import ContactVerifyAnswer from '@/app/com/data/ContactVerifyAnswer';
import ContactSender from '@/app/com/main/sender/ContactSender';
import Page from '@/app/com/data/common/Page';
import ContactAddHandleData from '@/app/com/data/ContactAddHandleData';
import ContactAddApplyQuery from '@/app/com/data/ContactAddApplyQuery';

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
