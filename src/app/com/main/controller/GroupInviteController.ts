import AbstractMaterial from '@/app/base/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Page from '@/app/com/data/common/Page';
import GroupInviteApplyQuery from '@/app/com/data/GroupInviteApplyQuery';
import GroupInviteVerifyHandleData from '@/app/com/data/GroupInviteVerifyHandleData';
import GroupInviteeApplyQuery from '@/app/com/data/GroupInviteeApplyQuery';
import GroupInviteeHandleData from '@/app/com/data/GroupInviteeHandleData';
import GroupInviteSender from '@/app/com/main/sender/GroupInviteSender';
import GroupInviteeApplyService from '@/app/com/main/service/GroupInviteeApplyService';
import GroupInviteApplyService from '@/app/com/main/service/GroupInviteApplyService';
import GroupInviteApplyEntityCase from '@/app/com/data/GroupInviteApplyEntityCase';

export default class GroupInviteController extends AbstractMaterial {


    public queryInviteApplyDataReceiveList(query: GroupInviteApplyQuery,
                                           page: Page,
                                           back: (p: Page, applicants: GroupInviteApplyEntityCase[]) => void): void {
        const service: GroupInviteApplyService = this.appContext.getMaterial(GroupInviteApplyService);
        service.queryInviteApplyDataReceiveList(query, page, back);
    }

    public inviteVerifyHandle(handle: GroupInviteVerifyHandleData, back?: DataBackAction, parallel?: boolean): void {
        const groupInviteSender: GroupInviteSender = this.appContext.getMaterial(GroupInviteSender);
        groupInviteSender.inviteVerifyHandle(handle, back, parallel);
    }

    public invite(groupId: string, userIds: string[], back?: DataBackAction, parallel?: boolean): void {
        const groupInviteSender: GroupInviteSender = this.appContext.getMaterial(GroupInviteSender);
        groupInviteSender.invite(groupId, userIds, back, parallel);
    }
}
