import AbstractMaterial from '@/app/base/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Message from '@/app/base/message/Message';
import ContactAddApplyData from '@/app/com/data/ContactAddApplyData';
import ContactVerifyAnswer from '@/app/com/data/ContactVerifyAnswer';
import Page from '@/app/com/data/Page';
import ContactAddHandleData from '@/app/com/data/ContactAddHandleData';

export default class GroupBusinessSender extends AbstractMaterial {

    private action: string = '1.2.201';

    public getList(back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0002');
        m.body = {};
        this.appContext.netServer.send(m, back, parallel);
    }

    public changeGroupOwner(groupId: string, newOwnerUserId: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0003');
        m.body = {};
        m.body.groupId = groupId;
        m.body.newOwnerUserId = newOwnerUserId;
        this.appContext.netServer.send(m, back, parallel);
    }

    public quit(groupId: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0004');
        m.body = {};
        m.body.groupId = groupId;
        this.appContext.netServer.send(m, back, parallel);
    }

    public disband(groupId: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0005');
        m.body = {};
        m.body.groupId = groupId;
        this.appContext.netServer.send(m, back, parallel);
    }
}
