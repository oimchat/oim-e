import PersonalViewImpl from '@/platform/vue/view/impl/PersonalViewImpl';
import WorkViewEnum from '@/app/com/common/view/WorkViewEnum';
import ContactListPaneViewImpl from '@/platform/vue/view/impl/ContactListPaneViewImpl';
import GroupListPaneViewImpl from '@/platform/vue/view/impl/GroupListPaneViewImpl';
import UserChatViewImpl from '@/platform/vue/view/impl/UserChatViewImpl';
import MessageListViewImpl from '@/platform/vue/view/impl/MessageListViewImpl';
import GroupChatViewImpl from '@/platform/vue/view/impl/GroupChatViewImpl';
import GroupMemberListViewImpl from '@/platform/vue/view/impl/GroupMemberListViewImpl';
import LaunchInitializer from '@/app/base/initialize/LaunchInitializer';
import AppContext from '@/app/base/context/AppContext';
import ContactInfoViewImpl from '@/platform/vue/view/impl/ContactInfoViewImpl';
import GroupInfoViewImpl from '@/platform/vue/view/impl/GroupInfoViewImpl';

class AppInitializer extends LaunchInitializer {

    public getOrder(): number {
        return 0;
    }

    public initialize(): void {
        this.initializeView(this.appContext);
    }

    public getKey(): string {
        const own: object = this;
        return own.constructor.name;
    }

    private initializeView(appContext: AppContext): void {
        appContext.putViewImpl(WorkViewEnum.PersonalView, PersonalViewImpl);
        appContext.putViewImpl(WorkViewEnum.ContactListPaneView, ContactListPaneViewImpl);
        appContext.putViewImpl(WorkViewEnum.GroupListPaneView, GroupListPaneViewImpl);
        appContext.putViewImpl(WorkViewEnum.MessageListView, MessageListViewImpl);
        appContext.putViewImpl(WorkViewEnum.UserChatView, UserChatViewImpl);
        appContext.putViewImpl(WorkViewEnum.GroupChatView, GroupChatViewImpl);
        appContext.putViewImpl(WorkViewEnum.GroupMemberListView, GroupMemberListViewImpl);
        appContext.putViewImpl(WorkViewEnum.ContactInfoView, ContactInfoViewImpl);
        appContext.putViewImpl(WorkViewEnum.GroupInfoView, GroupInfoViewImpl);
    }
}

export default AppInitializer;
