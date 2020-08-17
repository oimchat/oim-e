import Initializer from '@/app/base/initialize/Initializer';
import AppContext from '@/app/base/context/AppContext';
import Prompter from '@/app/com/client/component/Prompter';
import WebPromptHandlerImpl from '@/platform/web/impl/WebPromptHandlerImpl';
import WorkViewEnum from '@/app/com/common/view/WorkViewEnum';
import MessageAllUnreadViewImpl from '@/platform/web/view/impl/MessageAllUnreadViewImpl';
import GroupInviteApplyListViewImpl from '@/platform/web/view/impl/GroupInviteApplyListViewImpl';
import GroupInviteeApplyListViewImpl from '@/platform/web/view/impl/GroupInviteeApplyListViewImpl';
import GroupJoinApplyListViewImpl from '@/platform/web/view/impl/GroupJoinApplyListViewImpl';
import ContactAddApplyListViewImpl from '@/platform/web/view/impl/ContactAddApplyListViewImpl';
import WebPlatformFileIconInitializer from '@/platform/web/initialize/launch/more/WebPlatformFileIconInitializer';

export default class WebPlatformComponentInitializer implements Initializer {

    public getOrder(): number {
        return 0;
    }

    public getKey(): string {
        const own: object = this;
        return own.constructor.name;
    }

    public initialize(appContext: AppContext): void {
        const prompter: Prompter = appContext.getMaterial(Prompter);
        prompter.setPromptHandler(new WebPromptHandlerImpl());
        this.initializeView(appContext);
        this.initializeFileIcon(appContext);
    }

    public initializeView(appContext: AppContext) {
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
