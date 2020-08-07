import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Message from '@/app/base/message/Message';
import User from '@/app/com/main/module/business/user/bean/User';
import UserHead from '@/app/com/main/module/business/user/bean/UserHead';
import AbstractSender from '@/app/com/main/common/base/sender/AbstractSender';

export default class PersonalSender extends AbstractSender {

    private action: string = '1.1.002';

    public getUser(back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0007');
        m.body = {};
        this.send(m, back, parallel);
    }

    public updateUser(u: User, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0009');
        m.body = {};
        m.body = u;
        this.send(m, back, parallel);
    }

    public updatePassword(oldPassword: string, newPassword: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0010');
        m.body = {};
        m.body.oldPassword = oldPassword;
        m.body.newPassword = newPassword;
        this.send(m, back, parallel);
    }

    public uploadHead(head: UserHead, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0011');
        m.body = {};
        m.body = head;
        this.send(m, back, parallel);
    }

    public updateSignature(signature: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0012');
        m.body = {};
        m.body.signature = signature;
        this.send(m, back, parallel);
    }

    public updateStatus(status: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0013');
        m.body = {};
        m.body.status = status;
        this.send(m, back, parallel);
    }
}
