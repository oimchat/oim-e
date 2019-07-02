import AbstractMaterial from '@/app/base/AbstractMaterial';
import Message from '@/app/base/message/Message';
import GroupQuery from '@/app/com/data/GroupQuery';
import Page from '@/app/com/data/Page';
import DataBackAction from '@/app/base/net/DataBackAction';
import Group from '@/app/com/bean/Group';
import GroupHead from '@/app/com/bean/GroupHead';

export default class GroupInfoSender extends AbstractMaterial {

    private action: string = '1.2.200';

    public queryGroupList(groupQuery: GroupQuery, page: Page, back?: DataBackAction): void {
        const m = Message.build(this.action, '1.1.0001');
        m.body = {};
        m.body.query = groupQuery;
        m.body.page = page;
        this.appContext.netServer.send(m, back);
    }

    public getGroup(groupId: string, back?: DataBackAction): void {
        const m = Message.build(this.action, '1.1.0002');
        m.body = {};
        m.body.groupId = groupId;
        this.appContext.netServer.send(m, back);
    }

    public getGroups(groupIds: string[], back?: DataBackAction): void {
        const m = Message.build(this.action, '1.1.0003');
        m.body = {};
        m.body.groupIds = groupIds;
        this.appContext.netServer.send(m, back);
    }

    public addGroup(group: Group, back?: DataBackAction): void {
        const m = Message.build(this.action, '1.1.0005');
        m.body = {};
        m.body.group = group;
        this.appContext.netServer.send(m, back);
    }

    public updateGroup(group: Group, back?: DataBackAction): void {
        const m = Message.build(this.action, '1.1.0006');
        m.body = {};
        m.body.group = group;
        this.appContext.netServer.send(m, back);
    }

    public uploadHead(head: GroupHead, back?: DataBackAction): void {
        const m = Message.build(this.action, '1.1.0007');
        m.body = {};
        m.body.head = head;
        this.appContext.netServer.send(m, back);
    }
}
