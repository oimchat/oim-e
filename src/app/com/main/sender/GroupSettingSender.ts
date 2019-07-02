import AbstractMaterial from '@/app/base/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Message from '@/app/base/message/Message';
import GroupJoinSetting from '@/app/com/bean/GroupJoinSetting';
import GroupJoinVerifyQuestion from '@/app/com/bean/GroupJoinVerifyQuestion';

export default class GroupSettingSender extends AbstractMaterial {

    private action: string = '1.2.205';

    public getJoinSetting(groupId: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0001');
        m.body = {};
        m.body.groupId = groupId;
        this.appContext.netServer.send(m, back, parallel);
    }

    public updateJoinSetting(joinSetting: GroupJoinSetting, questionList: GroupJoinVerifyQuestion[], back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0002');
        m.body = {};
        m.body.joinSetting = joinSetting;
        m.body.questionList = questionList;
        this.appContext.netServer.send(m, back, parallel);
    }
}
