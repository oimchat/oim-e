import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import GroupJoinApplyListView from '@/app/com/main/module/business/group/view/GroupJoinApplyListView';

export default class GroupJoinApplyListViewDefaultImpl extends AbstractMaterial implements GroupJoinApplyListView {

    public isVisible(): boolean {
        return false;
    }

    public setVisible(visible: boolean): void {
        // no
    }
}
