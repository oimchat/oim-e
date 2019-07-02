import AbstractMaterial from '@/app/base/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Page from '@/app/com/data/Page';
import GroupInviteApplyQuery from '@/app/com/data/GroupInviteApplyQuery';
import GroupInviteVerifyHandleData from '@/app/com/data/GroupInviteVerifyHandleData';
import GroupInviteeApplyQuery from '@/app/com/data/GroupInviteeApplyQuery';
import GroupInviteeHandleData from '@/app/com/data/GroupInviteeHandleData';
import GroupInviteSender from '@/app/com/main/sender/GroupInviteSender';

export default class GroupInviteController extends AbstractMaterial {

    public getInviteApplyCount(query: GroupInviteApplyQuery, back?: DataBackAction, parallel?: boolean): void {
        const groupInviteSender: GroupInviteSender = this.appContext.getMaterial(GroupInviteSender);
        groupInviteSender.getInviteApplyCount(query, back, parallel);
    }

    public getInviteApplyList(query: GroupInviteApplyQuery, page: Page, back?: DataBackAction, parallel?: boolean): void {
        const groupInviteSender: GroupInviteSender = this.appContext.getMaterial(GroupInviteSender);
        groupInviteSender.getInviteApplyList(query, page, back, parallel);
    }

    public inviteVerifyHandle(handle: GroupInviteVerifyHandleData, back?: DataBackAction, parallel?: boolean): void {
        const groupInviteSender: GroupInviteSender = this.appContext.getMaterial(GroupInviteSender);
        groupInviteSender.inviteVerifyHandle(handle, back, parallel);
    }

    public invite(groupId: string, userIds: string[], back?: DataBackAction, parallel?: boolean): void {
        const groupInviteSender: GroupInviteSender = this.appContext.getMaterial(GroupInviteSender);
        groupInviteSender.invite(groupId, userIds, back, parallel);
    }


    public getInviteeCount(query: GroupInviteeApplyQuery, back?: DataBackAction, parallel?: boolean): void {
        const groupInviteSender: GroupInviteSender = this.appContext.getMaterial(GroupInviteSender);
        groupInviteSender.getInviteeCount(query, back, parallel);
    }

    public getInviteeList(query: GroupInviteeApplyQuery, page: Page, back?: DataBackAction, parallel?: boolean): void {
        const groupInviteSender: GroupInviteSender = this.appContext.getMaterial(GroupInviteSender);
        groupInviteSender.getInviteeList(query, page, back, parallel);
    }

    public inviteeHandle(handle: GroupInviteeHandleData, back?: DataBackAction, parallel?: boolean): void {
        const groupInviteSender: GroupInviteSender = this.appContext.getMaterial(GroupInviteSender);
        groupInviteSender.inviteeHandle(handle, back, parallel);
    }
}
