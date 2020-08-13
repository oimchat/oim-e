import GroupInfoView from '@/app/com/main/module/business/group/view/GroupInfoView';
import Group from '@/app/com/main/module/business/group/bean/Group';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import mainViewData from '@/platform/web/view/data/MainViewData';
import mainBaseTabs from '@/platform/web/view/data/MainBaseTabs';
import app from '@/app/App';
import GroupRelationBox from '@/app/com/main/module/business/group/box/GroupRelationBox';
import groupInfoViewModel from '@/platform/vue/view/model/GroupInfoViewModel';

export default class GroupInfoViewImpl extends AbstractMaterial implements GroupInfoView {

    public isVisible(): boolean {
        return mainViewData.tab === mainBaseTabs.groupTab.key;
    }

    public setGroup(group: Group): void {
        // no
        const groupId = group.id;
        const contactListBox: GroupRelationBox = app.appContext.getMaterial(GroupRelationBox);
        let relation: any;
        const list = contactListBox.getGroupInGroupRelationListByGroupId(groupId);
        if (list && list.length > 0) {
            relation = list[0];
        }
        groupInfoViewModel.setGroup(group);
        groupInfoViewModel.setRelation(relation);
    }

    public setVisible(visible: boolean): void {
        if (visible) {
            mainViewData.tab = mainBaseTabs.groupTab.key;
        }
    }
}
