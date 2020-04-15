import AbstractMaterial from '@/app/base/AbstractMaterial';
import Message from '@/app/base/message/Message';
import Page from '@/app/com/data/common/Page';
import DataBackAction from '@/app/base/net/DataBackAction';
import Content from '@/app/com/data/chat/content/Content';
import ChatQuery from '@/app/com/data/chat/ChatQuery';

export default class UserChatSender extends AbstractMaterial {

    private action: string = '1.3.101';

    public userChat(sendUserId: string, receiveUserId: string, content: Content, back?: DataBackAction): void {
        const m = Message.build(this.action, '1.1.0001');
        m.body = {};
        m.body.sendUserId = sendUserId;
        m.body.receiveUserId = receiveUserId;
        m.body.content = content;
        this.appContext.netServer.send(m, back);
    }

    public readByUserId(sendUserId: string, receiveUserId: string, back?: DataBackAction): void {
        const m = Message.build(this.action, '1.1.0002');
        m.body = {};
        m.body.sendUserId = sendUserId;
        m.body.receiveUserId = receiveUserId;
        this.appContext.netServer.send(m, back);
    }

    public queryList(sendUserId: string, receiveUserId: string, query: ChatQuery, page: Page, back?: DataBackAction): void {
        const m = Message.build(this.action, '1.1.0004');
        m.body = {};
        m.body.sendUserId = sendUserId;
        m.body.receiveUserId = receiveUserId;
        m.body.query = query;
        m.body.page = page;
        this.appContext.netServer.send(m, back);
    }

    public getListByMessageKey(sendUserId: string, receiveUserId: string, startMessageKey: string, direction: string, count: number, back?: DataBackAction): void {
        const m = Message.build(this.action, '1.1.0005');
        m.body = {};
        m.body.sendUserId = sendUserId;
        m.body.receiveUserId = receiveUserId;
        m.body.startMessageKey = startMessageKey;
        m.body.direction = direction;
        m.body.count = count;
        this.appContext.netServer.send(m, back);
    }

    public getListByContentId(sendUserId: string, receiveUserId: string, startId: string, direction: string, count: number, back?: DataBackAction): void {
        const m = Message.build(this.action, '1.1.0006');
        m.body = {};
        m.body.sendUserId = sendUserId;
        m.body.receiveUserId = receiveUserId;
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

    public getOfflineContentList(back?: DataBackAction): void {
        const m = Message.build(this.action, '1.1.0010');
        m.body = {};
        this.appContext.netServer.send(m, back);
    }
}
