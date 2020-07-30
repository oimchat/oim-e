import PromptHandler from '@/app/define/prompt/PromptHandler';

export default class WebPromptHandlerImpl implements PromptHandler {

    public prompt(message: string, title?: string, type?: string): void {
        // no
    }

    public error(message: string, title?: string): void {
        // no
    }

    public info(message: string, title?: string): void {
        // no
    }

    public success(message: string, title?: string): void {
        // no
    }

    public warn(message: string, title?: string): void {
        // no
    }
}
