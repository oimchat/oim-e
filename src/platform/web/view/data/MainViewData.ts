import MainTabData from "@/platform/web/view/data/MainTabData";

class MainViewData {
    public tab: string = 'user_tab';
    public tabs: MainTabData[] = [];

    public initialize(): void {
        const own = this;
        const tabs = this.tabs;
        tabs.length = 0;
        let data: MainTabData = new MainTabData();
        data.key = 'message_tab';
        data.icon = 'fas fa-comment-dots';
        data.setOnSelected(() => {
            // no
        });
        tabs.push(data);

        data = new MainTabData();
        data.key = 'user_tab';
        data.icon = 'fas fa-user';
        data.setOnSelected(() => {
            // no
        });
        tabs.push(data);

        data = new MainTabData();
        data.key = 'group_tab';
        data.icon = 'fas fa-user-friends';
        data.setOnSelected(() => {
            // no
        });
        tabs.push(data);

        data = new MainTabData();
        data.key = 'module_tab';
        data.icon = 'fas fa-th-large';
        data.setOnSelected(() => {
            // no
        });
        tabs.push(data);
    }
}

export default new MainViewData();
