import LaunchInitializer from '@/app/base/initialize/LaunchInitializer';
import AppContext from '@/app/base/context/AppContext';
import Prompter from '@/app/com/client/component/Prompter';
import WebPromptHandlerImpl from '@/platform/web/impl/WebPromptHandlerImpl';
import WorkViewEnum from '@/app/com/common/view/WorkViewEnum';
import MessageAllUnreadViewImpl from '@/platform/web/view/impl/MessageAllUnreadViewImpl';
import GroupInviteApplyListViewImpl from '@/platform/web/view/impl/GroupInviteApplyListViewImpl';
import GroupInviteeApplyListViewImpl from '@/platform/web/view/impl/GroupInviteeApplyListViewImpl';
import GroupJoinApplyListViewImpl from '@/platform/web/view/impl/GroupJoinApplyListViewImpl';
import ContactAddApplyListViewImpl from '@/platform/web/view/impl/ContactAddApplyListViewImpl';
import WebPlatformFileIconInitializer
    from '@/platform/common/web/initialize/launch/more/WebPlatformFileIconInitializer';
import WebGroupInfoViewImpl from '@/platform/web/view/impl/WebGroupInfoViewImpl';
import WebContactInfoViewImpl from '@/platform/web/view/impl/WebContactInfoViewImpl';
import WebGroupChatViewImpl from '@/platform/web/view/impl/WebGroupChatViewImpl';
import WebUserChatViewImpl from '@/platform/web/view/impl/WebUserChatViewImpl';

export default class WebPlatformComponentInitializer extends LaunchInitializer {

    public getOrder(): number {
        return 0;
    }

    public initialize(): void {
        this.initializeHandle(this.appContext);
    }

    public getKey(): string {
        const own: object = this;
        return own.constructor.name;
    }

    public initializeHandle(appContext: AppContext): void {
        const prompter: Prompter = appContext.getMaterial(Prompter);
        prompter.setPromptHandler(new WebPromptHandlerImpl());
        this.initializeView(appContext);
        this.initializeFileIcon(appContext);
    }

    public initializeView(appContext: AppContext) {
        appContext.putViewImpl(WorkViewEnum.UserChatView, WebUserChatViewImpl);
        appContext.putViewImpl(WorkViewEnum.GroupChatView, WebGroupChatViewImpl);
        appContext.putViewImpl(WorkViewEnum.ContactInfoView, WebContactInfoViewImpl);
        appContext.putViewImpl(WorkViewEnum.GroupInfoView, WebGroupInfoViewImpl);

        appContext.putViewImpl(WorkViewEnum.MessageAllUnreadView, MessageAllUnreadViewImpl);
        appContext.putViewImpl(WorkViewEnum.GroupInviteApplyListView, GroupInviteApplyListViewImpl);
        appContext.putViewImpl(WorkViewEnum.GroupInviteeApplyListView, GroupInviteeApplyListViewImpl);
        appContext.putViewImpl(WorkViewEnum.GroupJoinApplyListView, GroupJoinApplyListViewImpl);
        appContext.putViewImpl(WorkViewEnum.ContactAddApplyListView, ContactAddApplyListViewImpl);
    }

    public initializeFileIcon(appContext: AppContext) {
        const fileIconInitializer: WebPlatformFileIconInitializer = new WebPlatformFileIconInitializer();
        fileIconInitializer.initialize(appContext);
    }
}
