import AbstractMaterial from '@/app/base/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Message from '@/app/base/message/Message';
import ContactCategory from '@/app/com/bean/ContactCategory';
import Page from '@/app/com/data/common/Page';

export default class ContactCategorySender extends AbstractMaterial {

    private action: string = '1.2.002';

    public getCount(back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0001');
        m.body = {};
        this.appContext.netServer.send(m, back, parallel);
    }


    public getList(page: Page, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0002');
        m.body = {};
        this.appContext.netServer.send(m, back, parallel);
    }

    public getPageList(pageNumber: number, size: number, back?: DataBackAction, parallel?: boolean): void {
        const page: Page = new Page();
        page.number = pageNumber;
        page.size = size;
        this.getList(page, back, parallel);
    }

    public getCategory(categoryId: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0003');
        m.body = {};
        m.body.id = categoryId;
        this.appContext.netServer.send(m, back, parallel);
    }

    public addCategory(category: ContactCategory, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0004');
        m.body = category;
        this.appContext.netServer.send(m, back, parallel);
    }

    public updateName(categoryId: string, name: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0006');
        m.body = {};
        m.body.id = categoryId;
        m.body.name = name;
        this.appContext.netServer.send(m, back, parallel);
    }

    public updateRank(categoryId: string, rank: number, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0007');
        m.body = {};
        m.body.id = categoryId;
        m.body.rank = rank;
        this.appContext.netServer.send(m, back, parallel);
    }

    public delete(categoryId: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0008');
        m.body = {};
        m.body.id = categoryId;
        this.appContext.netServer.send(m, back, parallel);
    }
}
