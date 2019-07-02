import AbstractMaterial from '@/app/base/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Message from '@/app/base/message/Message';
import ContactCategory from '@/app/com/bean/ContactCategory';

export default class ContactCategorySender extends AbstractMaterial {

    private action: string = '1.2.102';

    public getList(back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0002');
        m.body = {};
        this.appContext.netServer.send(m, back, parallel);
    }

    public getCategory(categoryId: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0003');
        m.body = {};
        m.body.categoryId = categoryId;
        this.appContext.netServer.send(m, back, parallel);
    }

    public addCategory(category: ContactCategory, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0004');
        m.body = {};
        m.body.category = category;
        this.appContext.netServer.send(m, back, parallel);
    }

    public updateName(categoryId: string, name: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0006');
        m.body = {};
        m.body.categoryId = categoryId;
        m.body.name = name;
        this.appContext.netServer.send(m, back, parallel);
    }

    public updateRank(categoryId: string, rank: number, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0007');
        m.body = {};
        m.body.categoryId = categoryId;
        m.body.rank = rank;
        this.appContext.netServer.send(m, back, parallel);
    }

    public delete(categoryId: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0008');
        m.body = {};
        m.body.categoryId = categoryId;
        this.appContext.netServer.send(m, back, parallel);
    }
}
