import app from '@/app/App';
import PersonalView from '@/app/com/main/view/PersonalView';
import PersonalViewImpl from '@/impl/view/PersonalViewImpl';
import ViewEnum from '@/app/com/main/view/ViewEnum';
import ContactListPaneViewImpl from '@/impl/view/ContactListPaneViewImpl';
import GroupListPaneViewImpl from '@/impl/view/GroupListPaneViewImpl';
import Platform from '@/app/common/util/Platform';
import AppInfo from '@/app/base/config/AppInfo';
import DefaultUserChatView from '@/app/com/main/view/default/DefaultUserChatView';
import UserChatViewImpl from '@/impl/view/UserChatViewImpl';
import MessageListViewImpl from '@/impl/view/MessageListViewImpl';
import GroupChatViewImpl from '@/impl/view/GroupChatViewImpl';
import GroupMemberListViewImpl from '@/impl/view/GroupMemberListViewImpl';
import AllMessageUnreadBox from '@/app/com/main/box/AllMessageUnreadBox';
import DataChange from '@/app/base/event/DataChange';
import systemTrayBlinkDetection from '@/platform/SystemTrayBlinkDetection';

class AppInitialize {

    public constructor() {
        // this.initializeView();
    }

    public initialize(): void {
        this.initializeConfig();
        this.initializeView();
        this.initializeUnread();
    }

    private initializeView(): void {
        app.appContext.putView(ViewEnum.PersonalView, PersonalViewImpl);
        app.appContext.putView(ViewEnum.ContactListPaneView, ContactListPaneViewImpl);
        app.appContext.putView(ViewEnum.GroupListPaneView, GroupListPaneViewImpl);
        app.appContext.putView(ViewEnum.MessageListView, MessageListViewImpl);
        app.appContext.putView(ViewEnum.UserChatView, UserChatViewImpl);
        app.appContext.putView(ViewEnum.GroupChatView, GroupChatViewImpl);
        app.appContext.putView(ViewEnum.GroupMemberListView, GroupMemberListViewImpl);
    }

    private initializeConfig() {
        const osName = Platform.getName();
        AppInfo.APP_PLATFORM = osName;
    }

    private initializeUnread() {
        // tslint:disable-next-line:max-classes-per-file new-parens
        const change: DataChange<number> = new class implements DataChange<number> {
            public change(count: number): void {
                if (count > 0) {
                    systemTrayBlinkDetection.setBlink(true);
                } else {
                    systemTrayBlinkDetection.setBlink(false);
                }
            }
        };
        const allMessageUnreadBox: AllMessageUnreadBox = app.appContext.getMaterial(AllMessageUnreadBox);
        allMessageUnreadBox.addChangeEvent(change);
    }
}

export default new AppInitialize();
