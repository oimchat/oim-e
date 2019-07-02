import AbstractMaterial from '@/app/base/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Page from '@/app/com/data/Page';
import GroupJoinHandleData from '@/app/com/data/GroupJoinHandleData';
import GroupJoinApplyData from '@/app/com/data/GroupJoinApplyData';
import GroupJoinVerifyAnswer from '@/app/com/bean/GroupJoinVerifyAnswer';
import GroupJoinSender from '@/app/com/main/sender/GroupJoinSender';
import GroupJoinApplyQuery from '@/app/com/data/GroupJoinApplyQuery';

export default class GroupJoinController extends AbstractMaterial {

    public getJoinApplyCount(query: GroupJoinApplyQuery, back?: DataBackAction, parallel?: boolean): void {
        const groupJoinSender: GroupJoinSender = this.appContext.getMaterial(GroupJoinSender);
        groupJoinSender.getJoinApplyCount(query, back, parallel);
    }

    public getJoinApplyList(query: GroupJoinApplyQuery, page: Page, back?: DataBackAction, parallel?: boolean): void {
        const groupJoinSender: GroupJoinSender = this.appContext.getMaterial(GroupJoinSender);
        groupJoinSender.getJoinApplyList(query, page, back, parallel);
    }

    public joinHandle(handle: GroupJoinHandleData, back?: DataBackAction, parallel?: boolean): void {
        const groupJoinSender: GroupJoinSender = this.appContext.getMaterial(GroupJoinSender);
        groupJoinSender.joinHandle(handle, back, parallel);
    }

    public joinApply(apply: GroupJoinApplyData, answerList: GroupJoinVerifyAnswer[], back?: DataBackAction, parallel?: boolean): void {
        const groupJoinSender: GroupJoinSender = this.appContext.getMaterial(GroupJoinSender);
        groupJoinSender.joinApply(apply, answerList, back, parallel);
    }
}
