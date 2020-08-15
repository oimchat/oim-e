import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import GroupInviteApplyListViewService
    from '@/app/com/main/module/business/group/service/GroupInviteApplyListViewService';

export default class GroupInviteApplyListViewController extends AbstractMaterial {

    public show(): void {
        const service: GroupInviteApplyListViewService = this.appContext.getMaterial(GroupInviteApplyListViewService);
        service.show();
    }
}
