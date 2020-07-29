import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import PromptHandler from '@/app/define/prompt/PromptHandler';

export default class PromptModule extends AbstractMaterial implements PromptHandler {


    public message(info: any, successText: string, warningText: string): void {
        // no
    }

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
