import Initializer from '@/app/base/initialize/Initializer';
import AppContext from '@/app/base/context/AppContext';
import Prompter from '@/app/com/main/component/Prompter';
import WebPromptHandlerImpl from '@/platform/web/impl/WebPromptHandlerImpl';
import ViewEnum from "@/app/com/client/common/view/ViewEnum";
import MessageAllUnreadViewImpl from "@/platform/web/view/impl/MessageAllUnreadViewImpl";

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
    }

    public initializeView(appContext: AppContext) {
        appContext.putView(ViewEnum.MessageAllUnreadView, MessageAllUnreadViewImpl)
    }
}
