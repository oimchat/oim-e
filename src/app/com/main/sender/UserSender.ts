import AbstractMaterial from '@/app/base/AbstractMaterial';
import Message from '@/app/base/message/Message';
import UserQuery from '@/app/com/data/UserQuery';
import Page from '@/app/com/data/common/Page';
import DataBackAction from '@/app/base/net/DataBackAction';

export default class UserSender extends AbstractMaterial {

    private action: string = '1.1.003';

    public queryUserList(userQuery: UserQuery, page: Page, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0001');
        m.body = {};
        m.body.query = userQuery;
        m.body.page = page;
        this.appContext.netServer.send(m, back, parallel);
    }

    public getUser(userId: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0002');
        m.body = {};
        m.body.id = userId;
        this.appContext.netServer.send(m, back, parallel);
    }

    public getUsers(userIds: string[], back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0003');
        m.body = {};
        m.body.ids = userIds;
        this.appContext.netServer.send(m, back, parallel);
    }
}
