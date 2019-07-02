import AbstractMaterial from '@/app/base/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Message from '@/app/base/message/Message';
import Page from '@/app/com/data/Page';
import GroupJoinHandleData from '@/app/com/data/GroupJoinHandleData';
import GroupJoinVerifyAnswer from '@/app/com/bean/GroupJoinVerifyAnswer';
import GroupJoinApplyData from '@/app/com/data/GroupJoinApplyData';
import GroupJoinApplyQuery from '@/app/com/data/GroupJoinApplyQuery';

export default class GroupJoinSender extends AbstractMaterial {

    private action: string = '1.2.206';

    public getJoinApplyCount(query: GroupJoinApplyQuery, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0001');
        m.body = {};
        m.body.query = query;
        this.appContext.netServer.send(m, back, parallel);
    }

    public getJoinApplyList(query: GroupJoinApplyQuery, page: Page, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0002');
        m.body = {};
        m.body.page = page;
        m.body.query = query;
        this.appContext.netServer.send(m, back, parallel);
    }

    public joinHandle(handle: GroupJoinHandleData, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0003');
        m.body = {};
        m.body.handle = handle;
        this.appContext.netServer.send(m, back, parallel);
    }

    public joinApply(apply: GroupJoinApplyData, answerList: GroupJoinVerifyAnswer[], back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0005');
        m.body = {};
        m.body.apply = apply;
        m.body.answerList = answerList;
        this.appContext.netServer.send(m, back, parallel);
    }
}
