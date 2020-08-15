import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import WorkViewEnum from '@/app/com/common/view/WorkViewEnum';
import GroupJoinApplyListView from '@/app/com/main/module/business/group/view/GroupJoinApplyListView';

export default class GroupJoinApplyListViewService extends AbstractMaterial {

    public show(): void {
        const view: GroupJoinApplyListView = this.appContext.getView(WorkViewEnum.GroupJoinApplyListView);
        view.setVisible(true);
    }
}
