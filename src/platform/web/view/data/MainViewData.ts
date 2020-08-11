import MainTabData from '@/platform/web/view/data/MainTabData';
import mainBaseTabs from '@/platform/web/view/data/MainBaseTabs';

class MainViewData {
    public tab: string = mainBaseTabs.messageTab.key;
    public tabs: MainTabData[] = [];

    public initialize(): void {
        this.tabs = mainBaseTabs.tabs;
    }

    private add() {
        // no
    }
}

export default new MainViewData();
