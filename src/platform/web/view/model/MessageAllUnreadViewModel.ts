import mainBaseTabs from '@/platform/web/view/data/MainBaseTabs';

class MessageAllUnreadViewModel {
    public setRed(red: boolean, count: number): void {
        mainBaseTabs.messageTab.red = red;
        mainBaseTabs.messageTab.redCount = count;
    }
}

export default new MessageAllUnreadViewModel();
