import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Page from '@/app/com/common/data/Page';
import GroupJoinHandleData from '@/app/com/main/module/business/group/data/GroupJoinHandleData';
import GroupJoinApplyData from '@/app/com/main/module/business/group/data/GroupJoinApplyData';
import GroupJoinVerifyAnswer from '@/app/com/main/module/business/group/bean/GroupJoinVerifyAnswer';
import GroupJoinSender from '@/app/com/main/module/business/group/sender/GroupJoinSender';
import GroupJoinApplyQuery from '@/app/com/main/module/business/group/data/GroupJoinApplyQuery';
import GroupJoinApplyService from '@/app/com/main/module/business/group/service/GroupJoinApplyService';
import GroupJoinApplyEntityCase from '@/app/com/main/module/business/group/data/GroupJoinApplyEntityCase';

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

    public joinApply(apply: GroupJoinApplyData, answers: GroupJoinVerifyAnswer[], back?: DataBackAction, parallel?: boolean): void {
        const groupJoinSender: GroupJoinSender = this.appContext.getMaterial(GroupJoinSender);
        groupJoinSender.joinApply(apply, answers, back, parallel);
    }
}
