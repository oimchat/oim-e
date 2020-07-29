import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Page from '@/app/com/data/common/Page';
import GroupInviteeApplyQuery from '@/app/com/data/GroupInviteeApplyQuery';
import GroupInviteeHandleData from '@/app/com/data/GroupInviteeHandleData';
import GroupInviteSender from '@/app/com/main/sender/GroupInviteSender';
import GroupInviteeApplyService from '@/app/com/main/service/GroupInviteeApplyService';
import GroupInviteApplyEntityCase from '@/app/com/data/GroupInviteApplyEntityCase';

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
