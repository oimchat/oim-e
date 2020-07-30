import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Message from '@/app/base/message/Message';
import Page from '@/app/com/data/common/Page';
import GroupCategory from '@/app/com/bean/GroupCategory';
import AbstractSender from '@/app/com/main/sender/AbstractSender';

export default class GroupCategorySender extends AbstractSender {

    private action: string = '1.3.002';

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

    public getCategory(categoryId: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0003');
        m.body = {};
        m.body.id = categoryId;
        this.send(m, back, parallel);
    }

    public addCategory(category: GroupCategory, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0004');
        m.body = {};
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

    public updateRank(categoryId: string, rank: number, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0007');
        m.body = {};
        m.body.id = categoryId;
        m.body.rank = rank;
        this.send(m, back, parallel);
    }

    public delete(categoryId: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0008');
        m.body = {};
        m.body.id = categoryId;
        this.send(m, back, parallel);
    }
}
