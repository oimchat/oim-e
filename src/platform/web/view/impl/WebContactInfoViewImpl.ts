import ContactInfoViewImpl from '@/platform/vue/view/impl/ContactInfoViewImpl';
import mainViewData from '@/platform/web/view/data/MainViewData';
import mainBaseTabs from '@/platform/web/view/data/MainBaseTabs';

export default class WebContactInfoViewImpl extends ContactInfoViewImpl {

    public isVisible(): boolean {
        return mainViewData.tab === mainBaseTabs.contactTab.key;
    }

    public setVisible(visible: boolean): void {
        if (visible) {
            mainViewData.tab = mainBaseTabs.contactTab.key;
        }
    }
}
