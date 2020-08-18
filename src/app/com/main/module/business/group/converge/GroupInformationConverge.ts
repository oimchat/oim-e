import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import GroupInviteApplyListViewService
    from '@/app/com/main/module/business/group/service/GroupInviteApplyListViewService';
import SystemInformationService from '@/app/com/client/module/message/service/SystemInformationService';
import ApplyHandleInformType from '@/app/com/main/data/ApplyHandleInformType';
import GroupInviteeApplyListViewService
    from '@/app/com/main/module/business/group/service/GroupInviteeApplyListViewService';
import GroupJoinApplyListViewService from '@/app/com/main/module/business/group/service/GroupJoinApplyListViewService';

export default class GroupInformationConverge extends AbstractMaterial {

    public inviteInformation(count: number): void {
        const groupInviteApplyListViewService: GroupInviteApplyListViewService = this.appContext.getMaterial(GroupInviteApplyListViewService);
        const systemInformationService: SystemInformationService = this.appContext.getMaterial(SystemInformationService);
        systemInformationService.inform(
            ApplyHandleInformType.GroupInviteApply,
            '邀请加入群申请',
            ApplyHandleInformType.GroupInviteApply,
            (key, value) => {
                groupInviteApplyListViewService.show();
                systemInformationService.showByType(key);
            }, (key, value) => {
                systemInformationService.delete(key);
            }, true, count);
    }

    public inviteeInformation(count: number): void {
        const groupInviteeApplyListViewService: GroupInviteeApplyListViewService = this.appContext.getMaterial(GroupInviteeApplyListViewService);
        const systemInformationService: SystemInformationService = this.appContext.getMaterial(SystemInformationService);
        systemInformationService.inform(
            ApplyHandleInformType.GroupInviteeApply,
            '被邀请加入群',
            ApplyHandleInformType.GroupInviteeApply,
            (key, value) => {
                groupInviteeApplyListViewService.show();
                systemInformationService.showByType(key);
            }, (key, value) => {
                systemInformationService.delete(key);
            }, true, count);
    }

    public joinInformation(count: number): void {
        const groupJoinApplyListViewService: GroupJoinApplyListViewService = this.appContext.getMaterial(GroupJoinApplyListViewService);
        const systemInformationService: SystemInformationService = this.appContext.getMaterial(SystemInformationService);
        systemInformationService.inform(
            ApplyHandleInformType.GroupJoinApply,
            '加入群申请',
            ApplyHandleInformType.GroupJoinApply,
            (key, value) => {
                groupJoinApplyListViewService.show();
                systemInformationService.showByType(key);
            }, (key, value) => {
                systemInformationService.delete(key);
            }, true, count);
    }
}
