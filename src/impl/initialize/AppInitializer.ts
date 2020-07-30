import PersonalViewImpl from '@/impl/view/PersonalViewImpl';
import ViewEnum from '@/app/com/main/view/ViewEnum';
import ContactListPaneViewImpl from '@/impl/view/ContactListPaneViewImpl';
import GroupListPaneViewImpl from '@/impl/view/GroupListPaneViewImpl';
import UserChatViewImpl from '@/impl/view/UserChatViewImpl';
import MessageListViewImpl from '@/impl/view/MessageListViewImpl';
import GroupChatViewImpl from '@/impl/view/GroupChatViewImpl';
import GroupMemberListViewImpl from '@/impl/view/GroupMemberListViewImpl';
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
