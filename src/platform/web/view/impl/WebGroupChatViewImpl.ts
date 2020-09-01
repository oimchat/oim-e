import messageAreaViewModel from '@/platform/web/view/model/MessageAreaViewModel';
import MessageAreaViewType from '@/platform/web/view/model/MessageAreaViewType';
import mainViewData from '@/platform/web/view/data/MainViewData';
import mainBaseTabs from '@/platform/web/view/data/MainBaseTabs';
import GroupChatViewImpl from '@/platform/vue/view/impl/GroupChatViewImpl';

export default class WebGroupChatViewImpl extends GroupChatViewImpl{

    public isVisible(): boolean {
        const showPane = messageAreaViewModel.tab === MessageAreaViewType.GroupChat;
        const showMassage = mainViewData.tab === mainBaseTabs.messageTab.key;
        return showPane && showMassage;
    }

    public setVisible(visible: boolean): void {
        if (visible) {
            mainViewData.tab = mainBaseTabs.messageTab.key;
            messageAreaViewModel.tab = MessageAreaViewType.GroupChat;
        } else {
            mainViewData.tab = mainBaseTabs.messageTab.key;
            messageAreaViewModel.tab = MessageAreaViewType.No;
        }
    }
}
