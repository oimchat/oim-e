import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import GroupInviteApplyListView from '@/app/com/main/module/business/group/view/GroupInviteApplyListView';

export default class GroupInviteApplyListViewDefaultImpl extends AbstractMaterial implements GroupInviteApplyListView {

    public isVisible(): boolean {
        return false;
    }

    public setVisible(visible: boolean): void {
        // no
    }
}
