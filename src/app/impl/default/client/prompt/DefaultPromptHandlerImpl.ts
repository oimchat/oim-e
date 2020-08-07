import PromptHandler from '@/app/com/client/define/prompt/PromptHandler';

export default class DefaultPromptHandlerImpl implements PromptHandler {

    public error(message: string, title?: string): void {
        // no
    }

    public info(message: string, title?: string): void {
        // no
    }

    public prompt(message: string, title?: string, type?: string): void {
        // no
    }

    public success(message: string, title?: string): void {
        // no
    }

    public warn(message: string, title?: string): void {
        // no
    }
}
