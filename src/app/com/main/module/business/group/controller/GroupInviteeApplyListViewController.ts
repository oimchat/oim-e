import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import GroupInviteeApplyListViewService
    from '@/app/com/main/module/business/group/service/GroupInviteeApplyListViewService';

export default class GroupInviteeApplyListViewController extends AbstractMaterial {

    public show(): void {
        const service: GroupInviteeApplyListViewService = this.appContext.getMaterial(GroupInviteeApplyListViewService);
        service.show();
    }
}
