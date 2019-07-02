import AbstractMaterial from '@/app/base/AbstractMaterial';
import Message from '@/app/base/message/Message';
import UserQuery from '@/app/com/data/UserQuery';
import Page from '@/app/com/data/Page';
import DataBackAction from '@/app/base/net/DataBackAction';

export default class UserSender extends AbstractMaterial {

    private action: string = '1.1.002';

    public queryUserList(userQuery: UserQuery, page: Page, back?: DataBackAction): void {
        const m = Message.build(this.action, '1.1.0001');
        m.body = {};
        m.body.query = userQuery;
        m.body.page = page;
        this.appContext.netServer.send(m, back);
    }

    public getUser(userId: string, back?: DataBackAction): void {
        const m = Message.build(this.action, '1.1.0002');
        m.body = {};
        m.body.userId = userId;
        this.appContext.netServer.send(m, back);
    }

    public getUsers(userIds: string[], back?: DataBackAction): void {
        const m = Message.build(this.action, '1.1.0003');
        m.body = {};
        m.body.userIds = userIds;
        this.appContext.netServer.send(m, back);
    }
}
