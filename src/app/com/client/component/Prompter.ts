import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import PromptHandler from '@/app/com/client/define/prompt/PromptHandler';
import DefaultPromptHandlerImpl from '@/app/impl/default/client/prompt/DefaultPromptHandlerImpl';
import InfoUtil from '@/app/base/message/util/InfoUtil';

export default class Prompter extends AbstractMaterial implements PromptHandler {

    private promptHandler: PromptHandler = new DefaultPromptHandlerImpl();

    public promptData(data: any) {
        const own = this;
        if (data.info) {
            own.message(data.info, '', '');
        }
    }

    public message(info: any, successText: string, warningText: string): void {
        let message = '';
        if (info) {
            if (info.success) {
                message = InfoUtil.getDefaultPromptText(info);
                if (!message || '' === message) {
                    message = successText;
                }
                if (message) {
                    this.success(message);
                }
            } else {
                message = InfoUtil.getDefaultErrorText(info);
                if (!message || '' === message) {
                    message = warningText;
                }
                if (message) {
                    this.warn(message);
                }
            }
        } else {
            if (warningText) {
                this.error(message);
            }
        }
    }

    public prompt(message: string, title?: string, type?: string): void {
        this.promptHandler.prompt(message, title, type);
    }

    public error(message: string, title?: string): void {
        this.promptHandler.error(message, title);
    }

    public info(message: string, title?: string): void {
        this.promptHandler.info(message, title);
    }

    public success(message: string, title?: string): void {
        this.promptHandler.success(message, title);
    }

    public warn(message: string, title?: string): void {
        this.promptHandler.warn(message, title);
    }

    public setPromptHandler(promptHandler: PromptHandler): void {
        if (promptHandler) {
            this.promptHandler = promptHandler;
        }
    }
}
