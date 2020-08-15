import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import GroupInviteeApplyListView from '@/app/com/main/module/business/group/view/GroupInviteeApplyListView';

export default class GroupInviteeApplyListViewDefaultImpl extends AbstractMaterial implements GroupInviteeApplyListView {

    public isVisible(): boolean {
        return false;
    }

    public setVisible(visible: boolean): void {
        // no
    }
}
