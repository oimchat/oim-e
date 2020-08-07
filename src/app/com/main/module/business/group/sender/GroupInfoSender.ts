import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import Message from '@/app/base/message/Message';
import GroupQuery from '@/app/com/main/module/business/group/data/GroupQuery';
import Page from '@/app/com/common/data/Page';
import DataBackAction from '@/app/base/net/DataBackAction';
import AbstractSender from '@/app/com/main/common/base/sender/AbstractSender';

export default class GroupInfoSender extends AbstractSender  {

    private action: string = '1.3.001';

    public queryGroupList(query: GroupQuery, page: Page, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0001');
        m.body = {};
        m.body.query = query;
        m.body.page = page;
        this.send(m, back, parallel);
    }

    public getGroup(groupId: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0002');
        m.body = {};
        m.body.id = groupId;
        this.send(m, back, parallel);
    }

    public getGroups(groupIds: string[], back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0003');
        m.body = {};
        m.body.ids = groupIds;
        this.send(m, back, parallel);
    }
}
