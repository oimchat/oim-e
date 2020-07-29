import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Message from '@/app/base/message/Message';
import ContactAddApplyData from '@/app/com/data/ContactAddApplyData';
import ContactVerifyAnswer from '@/app/com/data/ContactVerifyAnswer';
import Page from '@/app/com/data/common/Page';
import ContactAddHandleData from '@/app/com/data/ContactAddHandleData';
import ContactAddApplyQuery from '@/app/com/data/ContactAddApplyQuery';

export default class ContactSender extends AbstractMaterial {

    private action: string = '1.2.001';


    public getContactAddVerifySetting(userId: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0006');
        m.body = {};
        m.body.targetUserId = userId;
        this.appContext.netServer.send(m, back, parallel);
    }

    public sendAddApply(apply: ContactAddApplyData, answerList: ContactVerifyAnswer[], back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0007');
        m.body = {};
        m.body.apply = apply;
        m.body.answers = answerList;
        this.appContext.netServer.send(m, back, parallel);
    }

    public getApplyCount(query: ContactAddApplyQuery, back?: DataBackAction): void {
        const m = Message.build(this.action, '1.1.0008');
        m.body = {};
        m.body.query = query;
        this.appContext.netServer.send(m, back);
    }

    public queryApplyReceiveList(query: ContactAddApplyQuery, page: Page, back?: DataBackAction): void {
        const m = Message.build(this.action, '1.1.0009');
        m.body = {};
        m.body.page = page;
        m.body.query = query;
        this.appContext.netServer.send(m, back);
    }

    public queryApplyDataReceiveList(query: ContactAddApplyQuery, page: Page, back?: DataBackAction): void {
        const m = Message.build(this.action, '1.1.0010');
        m.body = {};
        m.body.page = page;
        m.body.query = query;
        this.appContext.netServer.send(m, back);
    }

    public applyHandle(handle: ContactAddHandleData, back?: DataBackAction): void {
        const m = Message.build(this.action, '1.1.0012');
        m.body = {};
        m.body.handle = handle;
        this.appContext.netServer.send(m, back);
    }
}
