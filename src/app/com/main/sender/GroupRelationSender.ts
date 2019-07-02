import AbstractMaterial from '@/app/base/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Message from '@/app/base/message/Message';

export default class GroupRelationSender extends AbstractMaterial {

    private action: string = '1.2.203';

    public getList(back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0002');
        m.body = {};
        this.appContext.netServer.send(m, back, parallel);
    }


    public getRelation(groupId: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0004');
        m.body = {};
        m.body.groupId = groupId;
        this.appContext.netServer.send(m, back, parallel);
    }

    public updateRemark(groupId: string, remark: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0005');
        m.body = {};
        m.body.groupId = groupId;
        m.body.remark = remark;
        this.appContext.netServer.send(m, back, parallel);
    }

    public moveCategory(groupIds: string[], categoryId: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0006');
        m.body = {};
        m.body.groupIds = groupIds;
        m.body.categoryId = categoryId;
        this.appContext.netServer.send(m, back, parallel);
    }
}
