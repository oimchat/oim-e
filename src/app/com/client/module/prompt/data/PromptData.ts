export default class PromptData {
    public type: string = '';
    public key: string = '';
    public action: (key: string) => void = (key: string): void => {
        // no
    }
}
