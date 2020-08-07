import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Page from '@/app/com/common/data/Page';
import GroupInviteeApplyQuery from '@/app/com/main/module/business/group/data/GroupInviteeApplyQuery';
import GroupInviteeHandleData from '@/app/com/main/module/business/group/data/GroupInviteeHandleData';
import GroupInviteSender from '@/app/com/main/module/business/group/sender/GroupInviteSender';
import GroupInviteeApplyService from '@/app/com/main/module/business/group/service/GroupInviteeApplyService';
import GroupInviteApplyEntityCase from '@/app/com/main/module/business/group/data/GroupInviteApplyEntityCase';

export default class GroupInviteeController extends AbstractMaterial {


    public queryInviteeDataList(query: GroupInviteeApplyQuery,
                                page: Page,
                                back: (p: Page, applicants: GroupInviteApplyEntityCase[]) => void): void {
        const service: GroupInviteeApplyService = this.appContext.getMaterial(GroupInviteeApplyService);
        service.queryInviteeDataList(query, page, back);
    }


    public inviteeHandle(handle: GroupInviteeHandleData, back?: DataBackAction, parallel?: boolean): void {
        const groupInviteSender: GroupInviteSender = this.appContext.getMaterial(GroupInviteSender);
        groupInviteSender.inviteeHandle(handle, back, parallel);
    }
}
