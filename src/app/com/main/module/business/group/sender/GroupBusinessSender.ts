import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Message from '@/app/base/message/Message';
import Group from '@/app/com/main/module/business/group/bean/Group';
import GroupHead from '@/app/com/main/module/business/group/bean/GroupHead';
import AbstractSender from '@/app/com/main/common/base/sender/AbstractSender';

export default class GroupBusinessSender extends AbstractSender  {

    private action: string = '1.3.005';

    public getList(back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0002');
        m.body = {};
        this.send(m, back, parallel);
    }

    public addGroup(group: Group, back?: DataBackAction): void {
        const m = Message.build(this.action, '1.1.0005');
        m.body = group;
        this.send(m, back);
    }

    public updateGroup(group: Group, back?: DataBackAction): void {
        const m = Message.build(this.action, '1.1.0006');
        m.body = group;
        this.send(m, back);
    }

    public uploadHead(head: GroupHead, back?: DataBackAction): void {
        const m = Message.build(this.action, '1.1.0007');
        m.body = head;
        this.send(m, back);
    }

    public changeGroupOwner(groupId: string, newOwnerUserId: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0008');
        m.body = {};
        m.body.groupId = groupId;
        m.body.newOwnerUserId = newOwnerUserId;
        this.send(m, back, parallel);
    }

    public disband(groupId: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0009');
        m.body = {};
        m.body.groupId = groupId;
        this.send(m, back, parallel);
    }

    public quit(groupId: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0010');
        m.body = {};
        m.body.groupId = groupId;
        this.send(m, back, parallel);
    }
}
