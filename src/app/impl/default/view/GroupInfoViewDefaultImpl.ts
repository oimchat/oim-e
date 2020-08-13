import GroupInfoView from '@/app/com/main/module/business/group/view/GroupInfoView';
import Group from '@/app/com/main/module/business/group/bean/Group';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';

export default class GroupInfoViewDefaultImpl extends AbstractMaterial implements GroupInfoView {

    public isVisible(): boolean {
        return false;
    }

    public setGroup(group: Group): void {
        // no
    }

    public setVisible(visible: boolean): void {
        // no
    }
}
