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
import GroupInviteApplyListViewDefaultImpl from '@/app/impl/default/view/GroupInviteApplyListViewDefaultImpl';
import GroupInviteeApplyListViewDefaultImpl from '@/app/impl/default/view/GroupInviteeApplyListViewDefaultImpl';
import GroupJoinApplyListViewDefaultImpl from '@/app/impl/default/view/GroupJoinApplyListViewDefaultImpl';
import ContactAddApplyListViewDefaultImpl from '@/app/impl/default/view/ContactAddApplyListViewDefaultImpl';

export default class DefaultViewBuilder {

    public constructor(protected appContext: AppContext) {
        this.buildDefaultView();
    }

    public buildDefaultView(): void {
        LaunchOrder.start(this, 'buildDefaultView');
        this.appContext.putViewImpl(WorkViewEnum.MainView, MainViewDefaultImpl);
        this.appContext.putViewImpl(WorkViewEnum.PersonalView, PersonalViewDefaultImpl);
        this.appContext.putViewImpl(WorkViewEnum.ContactListPaneView, ContactListPaneViewDefaultImpl);
        this.appContext.putViewImpl(WorkViewEnum.GroupListPaneView, GroupListPaneViewDefaultImpl);
        this.appContext.putViewImpl(WorkViewEnum.MessageListView, MessageListViewDefaultImpl);
        this.appContext.putViewImpl(WorkViewEnum.UserChatView, UserChatViewDefaultImpl);
        this.appContext.putViewImpl(WorkViewEnum.GroupChatView, GroupChatViewDefaultImpl);
        this.appContext.putViewImpl(WorkViewEnum.ContactInfoView, ContactInfoViewDefaultImpl);
        this.appContext.putViewImpl(WorkViewEnum.GroupInfoView, GroupInfoViewDefaultImpl);
        this.appContext.putViewImpl(WorkViewEnum.GroupMemberListView, GroupMemberListViewDefaultImpl);
        this.appContext.putViewImpl(WorkViewEnum.MessageAllUnreadView, MessageAllUnreadViewDefaultImpl);
        this.appContext.putViewImpl(WorkViewEnum.GroupInviteApplyListView, GroupInviteApplyListViewDefaultImpl);
        this.appContext.putViewImpl(WorkViewEnum.GroupInviteeApplyListView, GroupInviteeApplyListViewDefaultImpl);
        this.appContext.putViewImpl(WorkViewEnum.GroupJoinApplyListView, GroupJoinApplyListViewDefaultImpl);
        this.appContext.putViewImpl(WorkViewEnum.ContactAddApplyListView, ContactAddApplyListViewDefaultImpl);
    }
}
