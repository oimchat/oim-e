import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import WorkViewEnum from '@/app/com/common/view/WorkViewEnum';
import GroupInviteApplyListView from '@/app/com/main/module/business/group/view/GroupInviteApplyListView';

export default class GroupInviteApplyListViewService extends AbstractMaterial {

    public show(): void {
        const view: GroupInviteApplyListView = this.appContext.getView(WorkViewEnum.GroupInviteApplyListView);
        view.setVisible(true);
    }
}
