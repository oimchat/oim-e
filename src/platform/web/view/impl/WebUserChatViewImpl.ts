import UserChatViewImpl from '@/platform/vue/view/impl/UserChatViewImpl';
import messageAreaViewModel from '@/platform/web/view/model/MessageAreaViewModel';
import MessageAreaViewType from '@/platform/web/view/model/MessageAreaViewType';
import mainViewData from '@/platform/web/view/data/MainViewData';
import mainBaseTabs from '@/platform/web/view/data/MainBaseTabs';

export default class WebUserChatViewImpl extends UserChatViewImpl {

    public isVisible(): boolean {
        const showPane = messageAreaViewModel.tab === MessageAreaViewType.UserChat;
        const showMassage = mainViewData.tab === mainBaseTabs.messageTab.key;
        return showPane && showMassage;
    }

    public setVisible(visible: boolean): void {
        if (visible) {
            mainViewData.tab = mainBaseTabs.messageTab.key;
            messageAreaViewModel.tab = MessageAreaViewType.UserChat;
        } else {
            mainViewData.tab = mainBaseTabs.messageTab.key;
            messageAreaViewModel.tab = MessageAreaViewType.No;
        }
    }
}
