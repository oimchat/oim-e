import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Message from '@/app/base/message/Message';
import ContactCategory from '@/app/com/main/module/business/contact/bean/ContactCategory';
import Page from '@/app/com/common/data/Page';
import AbstractSender from '@/app/com/main/common/base/sender/AbstractSender';

export default class ContactCategorySender extends AbstractSender  {

    private action: string = '1.2.002';

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
        this.send(m, back, parallel);
    }

    public addCategory(category: ContactCategory, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0004');
        m.body = category;
        this.send(m, back, parallel);
    }

    public updateName(categoryId: string, name: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0006');
        m.body = {};
        m.body.id = categoryId;
        m.body.name = name;
        this.send(m, back, parallel);
    }

    public updateSort(categoryId: string, sort: number, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0007');
        m.body = {};
        m.body.id = categoryId;
        m.body.sort = sort;
        this.send(m, back, parallel);
    }

    public delete(categoryId: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0008');
        m.body = {};
        m.body.id = categoryId;
        this.send(m, back, parallel);
    }
}
