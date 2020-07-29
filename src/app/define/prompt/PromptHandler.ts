export default interface PromptHandler {

    prompt(message: string, title?: string, type?: string): void;

    info(message: string, title?: string): void;

    success(message: string, title?: string): void;

    warn(message: string, title?: string): void;

    error(message: string, title?: string): void;

}
