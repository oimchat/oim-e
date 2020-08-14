import AppContext from '@/app/base/context/AppContext';
import WorkViewEnum from '@/app/com/common/view/WorkViewEnum';
import MainViewDefaultImpl from '@/app/impl/default/view/MainViewDefaultImpl';
import PersonalViewDefaultImpl from '@/app/impl/default/view/PersonalViewDefaultImpl';
import ContactListPaneViewDefaultImpl from '@/app/impl/default/view/ContactListPaneViewDefaultImpl';
import GroupListPaneViewDefaultImpl from '@/app/impl/default/view/GroupListPaneViewDefaultImpl';
import MessageListViewDefaultImpl from '@/app/impl/default/view/MessageListViewDefaultImpl';
import UserChatViewDefaultImpl from '@/app/impl/default/view/UserChatViewDefaultImpl';
import GroupChatViewDefaultImpl from '@/app/impl/default/view/GroupChatViewDefaultImpl';
import GroupMemberListViewDefaultImpl from '@/app/impl/default/view/GroupMemberListViewDefaultImpl';
import MessageAllUnreadViewDefaultImpl from '@/app/impl/default/view/MessageAllUnreadViewDefaultImpl';
import ContactInfoViewDefaultImpl from '@/app/impl/default/view/ContactInfoViewDefaultImpl';
import GroupInfoViewDefaultImpl from '@/app/impl/default/view/GroupInfoViewDefaultImpl';
import LaunchOrder from '@/app/LaunchOrder';

export default class DefaultViewBuilder {

    public constructor(protected appContext: AppContext) {
        this.buildDefaultView();
    }

    public buildDefaultView(): void {
        LaunchOrder.start(this, 'buildDefaultView');
        this.appContext.putView(WorkViewEnum.MainView, MainViewDefaultImpl);
        this.appContext.putView(WorkViewEnum.PersonalView, PersonalViewDefaultImpl);
        this.appContext.putView(WorkViewEnum.ContactListPaneView, ContactListPaneViewDefaultImpl);
        this.appContext.putView(WorkViewEnum.GroupListPaneView, GroupListPaneViewDefaultImpl);
        this.appContext.putView(WorkViewEnum.MessageListView, MessageListViewDefaultImpl);
        this.appContext.putView(WorkViewEnum.UserChatView, UserChatViewDefaultImpl);
        this.appContext.putView(WorkViewEnum.GroupChatView, GroupChatViewDefaultImpl);
        this.appContext.putView(WorkViewEnum.ContactInfoView, ContactInfoViewDefaultImpl);
        this.appContext.putView(WorkViewEnum.GroupInfoView, GroupInfoViewDefaultImpl);
        this.appContext.putView(WorkViewEnum.GroupMemberListView, GroupMemberListViewDefaultImpl);
        this.appContext.putView(WorkViewEnum.MessageAllUnreadView, MessageAllUnreadViewDefaultImpl);
    }
}
