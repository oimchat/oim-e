import AbstractMaterial from '@/app/base/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Message from '@/app/base/message/Message';

export default class GroupMemberSender extends AbstractMaterial {

    private action: string = '1.2.204';

    public getOwnerGroupMemberList(userId: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0002');
        m.body = {};
        m.body.userId = userId;
        this.appContext.netServer.send(m, back, parallel);
    }

    public getGroupMemberList(groupId: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0004');
        m.body = {};
        m.body.groupId = groupId;
        this.appContext.netServer.send(m, back, parallel);
    }

    public getGroupMember(groupId: string, userId: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0005');
        m.body = {};
        m.body.groupId = groupId;
        m.body.userId = userId;
        this.appContext.netServer.send(m, back, parallel);
    }

    public getGroupMemberUserList(groupId: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0006');
        m.body = {};
        m.body.groupId = groupId;
        this.appContext.netServer.send(m, back, parallel);
    }

    public updateNickname(groupId: string, userId: string, nickname: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0007');
        m.body = {};
        m.body.groupId = groupId;
        m.body.userId = userId;
        m.body.nickname = nickname;
        this.appContext.netServer.send(m, back, parallel);
    }


    public updatePosition(groupId: string, userId: string, position: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0009');
        m.body = {};
        m.body.groupId = groupId;
        m.body.userId = userId;
        m.body.position = position;
        this.appContext.netServer.send(m, back, parallel);
    }


    public delete(groupId: string, userId: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0010');
        m.body = {};
        m.body.groupId = groupId;
        m.body.userId = userId;
        this.appContext.netServer.send(m, back, parallel);
    }
}
