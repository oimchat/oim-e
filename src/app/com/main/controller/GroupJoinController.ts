import AbstractMaterial from '@/app/base/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Page from '@/app/com/data/common/Page';
import GroupJoinHandleData from '@/app/com/data/GroupJoinHandleData';
import GroupJoinApplyData from '@/app/com/data/GroupJoinApplyData';
import GroupJoinVerifyAnswer from '@/app/com/bean/GroupJoinVerifyAnswer';
import GroupJoinSender from '@/app/com/main/sender/GroupJoinSender';
import GroupJoinApplyQuery from '@/app/com/data/GroupJoinApplyQuery';
import GroupJoinApplyService from '@/app/com/main/service/GroupJoinApplyService';
import GroupJoinApplyEntityCase from '@/app/com/data/GroupJoinApplyEntityCase';

export default class GroupJoinController extends AbstractMaterial {


    public queryApplyDataReceiveList(query: GroupJoinApplyQuery,
                                     page: Page,
                                     back: (p: Page, applicants: GroupJoinApplyEntityCase[]) => void): void {
        const service: GroupJoinApplyService = this.appContext.getMaterial(GroupJoinApplyService);
        service.queryApplyDataReceiveList(query, page, back);
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
