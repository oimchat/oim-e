import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import GroupInviteApplyListView from '@/app/com/main/module/business/group/view/GroupInviteApplyListView';
import applyHandleViewModel from '@/platform/web/view/model/ApplyHandleViewModel';
import ApplyHandleType from '@/platform/web/view/data/ApplyHandleType';
import RouterUtil from '@/common/vue/RouterUtil';
import mainViewData from '@/platform/web/view/data/MainViewData';
import mainBaseTabs from '@/platform/web/view/data/MainBaseTabs';

export default class GroupInviteApplyListViewImpl extends AbstractMaterial implements GroupInviteApplyListView {

    public isVisible(): boolean {
        return applyHandleViewModel.tab === ApplyHandleType.GroupInviteApplyListView;
    }

    public setVisible(visible: boolean): void {
        // no
        if (visible) {
            mainViewData.tab = mainBaseTabs.moduleTab.key;
            RouterUtil.toByPath('/module/notice');
            applyHandleViewModel.tab = ApplyHandleType.GroupInviteApplyListView;
        }
    }
}
