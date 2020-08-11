import MainTabData from '@/platform/web/view/data/MainTabData';

class MainBaseTabs {
    public tabs: MainTabData[] = [];
    public messageTab: MainTabData = new MainTabData();
    public contactTab: MainTabData = new MainTabData();
    public groupTab: MainTabData = new MainTabData();
    public moduleTab: MainTabData = new MainTabData();

    constructor() {
        this.initialize();
    }

    public initialize(): void {
        const own = this;
        const tabs = this.tabs;
        tabs.length = 0;
        let data: MainTabData = this.messageTab;
        data.key = 'message_tab';
        data.icon = 'fas fa-comment-dots';
        data.setOnSelected(() => {
            // no
        });
        tabs.push(data);

        data = this.contactTab;
        data.key = 'contact_tab';
        data.icon = 'fas fa-user';
        data.setOnSelected(() => {
            // no
        });
        tabs.push(data);

        data = this.groupTab;
        data.key = 'group_tab';
        data.icon = 'fas fa-user-friends';
        data.setOnSelected(() => {
            // no
        });
        tabs.push(data);

        data = this.moduleTab;
        data.key = 'module_tab';
        data.icon = 'fas fa-th-large';
        data.setOnSelected(() => {
            // no
        });
        tabs.push(data);
    }
}

export default new MainBaseTabs();
