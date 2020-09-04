import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Message from '@/app/base/message/Message';
import Page from '@/app/com/common/data/Page';
import GroupJoinHandleData from '@/app/com/main/module/business/group/data/GroupJoinHandleData';
import GroupJoinVerifyAnswer from '@/app/com/main/module/business/group/bean/GroupJoinVerifyAnswer';
import GroupJoinApplyData from '@/app/com/main/module/business/group/data/GroupJoinApplyData';
import GroupJoinApplyQuery from '@/app/com/main/module/business/group/data/GroupJoinApplyQuery';
import AbstractSender from '@/app/com/main/common/base/sender/AbstractSender';

export default class GroupJoinSender extends AbstractSender  {

    private action: string = '1.3.007';

    public queryJoinApplyReceiveCount(query: GroupJoinApplyQuery, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0001');
        m.body = {};
        m.body.query = query;
        this.send(m, back, parallel);
    }

    public queryJoinApplyReceiveList(query: GroupJoinApplyQuery, page: Page, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0002');
        m.body = {};
        m.body.page = page;
        m.body.query = query;
        this.send(m, back, parallel);
    }

    public queryJoinApplyDataReceiveList(query: GroupJoinApplyQuery, page: Page, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0003');
        m.body = {};
        m.body.page = page;
        m.body.query = query;
        this.send(m, back, parallel);
    }

    public joinHandle(handle: GroupJoinHandleData, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0005');
        m.body = {};
        m.body.handle = handle;
        this.send(m, back, parallel);
    }

    public joinApply(apply: GroupJoinApplyData, answers: GroupJoinVerifyAnswer[], back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0006');
        m.body = {};
        m.body.apply = apply;
        m.body.answers = answers;
        this.send(m, back, parallel);
    }
}
