import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Message from '@/app/base/message/Message';
import Page from '@/app/com/common/data/Page';
import AbstractSender from '@/app/com/main/common/base/sender/AbstractSender';

export default class ContactRelationSender extends AbstractSender {

    private action: string = '1.2.003';

    public getCount(back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0001');
        m.body = {};
        this.send(m, back, parallel);
    }


    public getList(page: Page, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0002');
        m.body = {};
        this.send(m, back, parallel);
    }


    public getRelation(contactUserId: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0004');
        m.body = {};
        m.body.contactUserId = contactUserId;
        this.send(m, back, parallel);
    }

    public updateRemark(contactUserId: string, remark: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0005');
        m.body = {};
        m.body.contactUserId = contactUserId;
        m.body.remark = remark;
        this.send(m, back, parallel);
    }

    public moveCategory(contactUserIds: string[], categoryId: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0006');
        m.body = {};
        m.body.contactUserIds = contactUserIds;
        m.body.categoryId = categoryId;
        this.send(m, back, parallel);
    }

    public delete(contactUserId: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0007');
        m.body = {};
        m.body.contactUserId = contactUserId;
        this.send(m, back, parallel);
    }

    public updateBlocked(contactUserId: string, isBlocked: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0008');
        m.body = {};
        m.body.contactUserId = contactUserId;
        m.body.isBlocked = isBlocked;
        this.send(m, back, parallel);
    }
}
