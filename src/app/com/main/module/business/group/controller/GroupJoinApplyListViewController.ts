import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import GroupJoinApplyListViewService from '@/app/com/main/module/business/group/service/GroupJoinApplyListViewService';

export default class GroupJoinApplyListViewController extends AbstractMaterial {

    public show(): void {
        const service: GroupJoinApplyListViewService = this.appContext.getMaterial(GroupJoinApplyListViewService);
        service.show();
    }
}
