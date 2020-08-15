import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import GroupJoinApplyListView from '@/app/com/main/module/business/group/view/GroupJoinApplyListView';
import applyHandleViewModel from '@/platform/web/view/model/ApplyHandleViewModel';
import ApplyHandleType from '@/platform/web/view/data/ApplyHandleType';
import RouterUtil from '@/common/vue/RouterUtil';
import mainViewData from '@/platform/web/view/data/MainViewData';
import mainBaseTabs from '@/platform/web/view/data/MainBaseTabs';

export default class GroupJoinApplyListViewImpl extends AbstractMaterial implements GroupJoinApplyListView {

    public isVisible(): boolean {
        return applyHandleViewModel.tab === ApplyHandleType.GroupJoinApplyListView;
    }

    public setVisible(visible: boolean): void {
        // no
        if (visible) {
            mainViewData.tab = mainBaseTabs.moduleTab.key;
            RouterUtil.toByPath('/module/notice');
            applyHandleViewModel.tab = ApplyHandleType.GroupJoinApplyListView;
        }
    }
}
