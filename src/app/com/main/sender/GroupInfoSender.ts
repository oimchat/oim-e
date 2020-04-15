import AbstractMaterial from '@/app/base/AbstractMaterial';
import Message from '@/app/base/message/Message';
import GroupQuery from '@/app/com/data/GroupQuery';
import Page from '@/app/com/data/common/Page';
import DataBackAction from '@/app/base/net/DataBackAction';

export default class GroupInfoSender extends AbstractMaterial {

    private action: string = '1.3.001';

    public queryGroupList(query: GroupQuery, page: Page, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0001');
        m.body = {};
        m.body.query = query;
        m.body.page = page;
        this.appContext.netServer.send(m, back, parallel);
    }

    public getGroup(groupId: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0002');
        m.body = {};
        m.body.id = groupId;
        this.appContext.netServer.send(m, back, parallel);
    }

    public getGroups(groupIds: string[], back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0003');
        m.body = {};
        m.body.ids = groupIds;
        this.appContext.netServer.send(m, back, parallel);
    }
}
