import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import WorkViewEnum from '@/app/com/common/view/WorkViewEnum';
import GroupInviteeApplyListView from '@/app/com/main/module/business/group/view/GroupInviteeApplyListView';

export default class GroupInviteeApplyListViewService extends AbstractMaterial {

    public show(): void {
        const view: GroupInviteeApplyListView = this.appContext.getView(WorkViewEnum.GroupInviteeApplyListView);
        view.setVisible(true);
    }
}
