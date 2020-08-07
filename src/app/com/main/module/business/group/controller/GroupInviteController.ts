import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Page from '@/app/com/common/data/Page';
import GroupInviteApplyQuery from '@/app/com/main/module/business/group/data/GroupInviteApplyQuery';
import GroupInviteVerifyHandleData from '@/app/com/main/module/business/group/data/GroupInviteVerifyHandleData';
import GroupInviteeApplyQuery from '@/app/com/main/module/business/group/data/GroupInviteeApplyQuery';
import GroupInviteeHandleData from '@/app/com/main/module/business/group/data/GroupInviteeHandleData';
import GroupInviteSender from '@/app/com/main/module/business/group/sender/GroupInviteSender';
import GroupInviteeApplyService from '@/app/com/main/module/business/group/service/GroupInviteeApplyService';
import GroupInviteApplyService from '@/app/com/main/module/business/group/service/GroupInviteApplyService';
import GroupInviteApplyEntityCase from '@/app/com/main/module/business/group/data/GroupInviteApplyEntityCase';

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
