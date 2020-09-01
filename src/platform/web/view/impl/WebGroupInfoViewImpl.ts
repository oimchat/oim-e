import GroupInfoViewImpl from '@/platform/vue/view/impl/GroupInfoViewImpl';
import mainViewData from '@/platform/web/view/data/MainViewData';
import mainBaseTabs from '@/platform/web/view/data/MainBaseTabs';

export default class WebGroupInfoViewImpl extends GroupInfoViewImpl {

    public setVisible(visible: boolean): void {
        if (visible) {
            mainViewData.tab = mainBaseTabs.groupTab.key;
        }
    }

    public isVisible(): boolean {
        return mainViewData.tab === mainBaseTabs.groupTab.key;
    }
}
