import Initializer from '@/app/base/initialize/Initializer';
import AppContext from '@/app/base/context/AppContext';
import Prompter from '@/app/com/main/component/Prompter';
import WebPromptHandlerImpl from '@/platform/web/impl/WebPromptHandlerImpl';

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
    }
}
