import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import Message from '@/app/base/message/Message';
import Page from '@/app/com/data/common/Page';
import DataBackAction from '@/app/base/net/DataBackAction';
import GroupChatQuery from '@/app/com/data/chat/GroupChatQuery';

export default class GroupChatDataSender extends AbstractMaterial {

    private action: string = '2.3.002';

    public queryCount(query: GroupChatQuery, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0001');
        m.body = {};
        m.body.query = query;
        this.appContext.netServer.send(m, back, parallel);
    }

    public queryList(query: GroupChatQuery, page: Page, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0002');
        m.body = {};
        m.body.query = query;
        m.body.page = page;
        this.appContext.netServer.send(m, back, parallel);
    }

    public getByContentId(contentId: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0003');
        m.body = {};
        m.body.contentId = contentId;
        this.appContext.netServer.send(m, back, parallel);
    }

    public getByContentIds(contentIds: string[], back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0004');
        m.body = {};
        m.body.contentIds = contentIds;
        this.appContext.netServer.send(m, back, parallel);
    }

    public getListByStartId(groupId: string, startId: string, direction: string, count: number, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0007');
        m.body = {};
        m.body.groupId = groupId;
        m.body.startId = startId;
        m.body.direction = direction;
        m.body.count = count;
        this.appContext.netServer.send(m, back, parallel);
    }

    public getListByStartMessageKey(groupId: string, startMessageKey: string, direction: string, count: number, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0008');
        m.body = {};
        m.body.groupId = groupId;
        m.body.startMessageKey = startMessageKey;
        m.body.direction = direction;
        m.body.count = count;
        this.appContext.netServer.send(m, back, parallel);
    }
}
