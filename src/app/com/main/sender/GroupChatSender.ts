import AbstractMaterial from '@/app/base/AbstractMaterial';
import Message from '@/app/base/message/Message';
import Page from '@/app/com/data/common/Page';
import DataBackAction from '@/app/base/net/DataBackAction';
import Content from '@/app/com/data/chat/content/Content';
import ChatQuery from '@/app/com/data/chat/ChatQuery';

export default class GroupChatSender extends AbstractMaterial {

    private action: string = '1.8.003';

    public chat(userId: string, groupId: string, content: Content, back?: DataBackAction): void {
        const m = Message.build(this.action, '1.1.0001');
        m.body = {};
        m.body.userId = userId;
        m.body.groupId = groupId;
        m.body.content = content;
        this.appContext.netServer.send(m, back);
    }

    public readByGroupId(userId: string, groupId: string, back?: DataBackAction): void {
        const m = Message.build(this.action, '1.1.0002');
        m.body = {};
        m.body.userId = userId;
        m.body.groupId = groupId;
        this.appContext.netServer.send(m, back);
    }

    public queryList(groupId: string, query: ChatQuery, page: Page, back?: DataBackAction): void {
        const m = Message.build(this.action, '1.1.0004');
        m.body = {};
        m.body.groupId = groupId;
        m.body.query = query;
        m.body.page = page;
        this.appContext.netServer.send(m, back);
    }

    public getListByMessageKey(groupId: string, startMessageKey: string, direction: string, count: number, back?: DataBackAction): void {
        const m = Message.build(this.action, '1.1.0005');
        m.body = {};
        m.body.groupId = groupId;
        m.body.startMessageKey = startMessageKey;
        m.body.direction = direction;
        m.body.count = count;
        this.appContext.netServer.send(m, back);
    }

    public getListByContentId(groupId: string, startId: string, direction: string, count: number, back?: DataBackAction): void {
        const m = Message.build(this.action, '1.1.0006');
        m.body = {};
        m.body.groupId = groupId;
        m.body.startId = startId;
        m.body.direction = direction;
        m.body.count = count;
        this.appContext.netServer.send(m, back);
    }

    public getLastChatWithContentList(count: number, back?: DataBackAction): void {
        const m = Message.build(this.action, '1.1.0007');
        m.body = {};
        m.body.count = count;
        this.appContext.netServer.send(m, back);
    }

    public getOfflineCountList(back?: DataBackAction): void {
        const m = Message.build(this.action, '1.1.0011');
        m.body = {};
        this.appContext.netServer.send(m, back);
    }
}
