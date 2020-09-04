import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Message from '@/app/base/message/Message';
import ContactAddApplyData from '@/app/com/main/module/business/contact/data/ContactAddApplyData';
import ContactVerifyAnswer from '@/app/com/main/module/business/contact/data/ContactVerifyAnswer';
import Page from '@/app/com/common/data/Page';
import ContactAddHandleData from '@/app/com/main/module/business/contact/data/ContactAddHandleData';
import ContactAddApplyQuery from '@/app/com/main/module/business/contact/data/ContactAddApplyQuery';
import AbstractSender from '@/app/com/main/common/base/sender/AbstractSender';

export default class ContactSender extends AbstractSender  {

    private action: string = '1.2.001';


    public getContactAddVerifySetting(userId: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0006');
        m.body = {};
        m.body.targetUserId = userId;
        this.send(m, back, parallel);
    }

    public sendAddApply(apply: ContactAddApplyData, answers: ContactVerifyAnswer[], back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0007');
        m.body = {};
        m.body.apply = apply;
        m.body.answers = answers;
        this.send(m, back, parallel);
    }

    public getApplyCount(query: ContactAddApplyQuery, back?: DataBackAction): void {
        const m = Message.build(this.action, '1.1.0008');
        m.body = {};
        m.body.query = query;
        this.send(m, back);
    }

    public queryApplyReceiveList(query: ContactAddApplyQuery, page: Page, back?: DataBackAction): void {
        const m = Message.build(this.action, '1.1.0009');
        m.body = {};
        m.body.page = page;
        m.body.query = query;
        this.send(m, back);
    }

    public queryApplyDataReceiveList(query: ContactAddApplyQuery, page: Page, back?: DataBackAction): void {
        const m = Message.build(this.action, '1.1.0010');
        m.body = {};
        m.body.page = page;
        m.body.query = query;
        this.send(m, back);
    }

    public applyHandle(handle: ContactAddHandleData, back?: DataBackAction): void {
        const m = Message.build(this.action, '1.1.0012');
        m.body = {};
        m.body.handle = handle;
        this.send(m, back);
    }
}
