import PersonalViewImpl from '@/platform/vue/view/impl/PersonalViewImpl';
import ViewEnum from '@/app/com/client/common/view/ViewEnum';
import ContactListPaneViewImpl from '@/platform/vue/view/impl/ContactListPaneViewImpl';
import GroupListPaneViewImpl from '@/platform/vue/view/impl/GroupListPaneViewImpl';
import UserChatViewImpl from '@/platform/vue/view/impl/UserChatViewImpl';
import MessageListViewImpl from '@/platform/vue/view/impl/MessageListViewImpl';
import GroupChatViewImpl from '@/platform/vue/view/impl/GroupChatViewImpl';
import GroupMemberListViewImpl from '@/platform/vue/view/impl/GroupMemberListViewImpl';
import Initializer from '@/app/base/initialize/Initializer';
import AppContext from '@/app/base/context/AppContext';

class AppInitializer implements Initializer {

    public getOrder(): number {
        return 0;
    }

    public initialize(appContext: AppContext): void {
        this.initializeView(appContext);
    }

    public getKey(): string {
        const own: object = this;
        return own.constructor.name;
    }

    private initializeView(appContext: AppContext): void {
        appContext.putView(ViewEnum.PersonalView, PersonalViewImpl);
        appContext.putView(ViewEnum.ContactListPaneView, ContactListPaneViewImpl);
        appContext.putView(ViewEnum.GroupListPaneView, GroupListPaneViewImpl);
        appContext.putView(ViewEnum.MessageListView, MessageListViewImpl);
        appContext.putView(ViewEnum.UserChatView, UserChatViewImpl);
        appContext.putView(ViewEnum.GroupChatView, GroupChatViewImpl);
        appContext.putView(ViewEnum.GroupMemberListView, GroupMemberListViewImpl);
    }
}

export default AppInitializer;
