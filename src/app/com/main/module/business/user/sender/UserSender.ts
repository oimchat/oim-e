import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import Message from '@/app/base/message/Message';
import UserQuery from '@/app/com/main/module/business/user/data/UserQuery';
import Page from '@/app/com/common/data/Page';
import DataBackAction from '@/app/base/net/DataBackAction';
import AbstractSender from '@/app/com/main/common/base/sender/AbstractSender';

export default class UserSender extends AbstractSender  {

    private action: string = '1.1.003';

    public queryUserList(query: UserQuery, page: Page, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0001');
        m.body = {};
        m.body.query = query;
        m.body.page = page;
        this.send(m, back, parallel);
    }

    public getUser(userId: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0002');
        m.body = {};
        m.body.id = userId;
        this.send(m, back, parallel);
    }

    public getUsers(userIds: string[], back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0003');
        m.body = {};
        m.body.ids = userIds;
        this.send(m, back, parallel);
    }
}
