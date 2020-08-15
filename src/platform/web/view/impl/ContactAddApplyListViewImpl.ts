import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import ContactAddApplyListView from '@/app/com/main/module/business/contact/view/ContactAddApplyListView';
import applyHandleViewModel from '@/platform/web/view/model/ApplyHandleViewModel';
import ApplyHandleType from '@/platform/web/view/data/ApplyHandleType';
import RouterUtil from '@/common/vue/RouterUtil';
import mainViewData from '@/platform/web/view/data/MainViewData';
import mainBaseTabs from '@/platform/web/view/data/MainBaseTabs';

export default class ContactAddApplyListViewImpl extends AbstractMaterial implements ContactAddApplyListView {

    public isVisible(): boolean {
        return applyHandleViewModel.tab === ApplyHandleType.ContactAddApplyListView;
    }

    public setVisible(visible: boolean): void {
        // no
        if (visible) {
            mainViewData.tab = mainBaseTabs.moduleTab.key;
            RouterUtil.toByPath('/module/notice');
            applyHandleViewModel.tab = ApplyHandleType.ContactAddApplyListView;
        }
    }
}
