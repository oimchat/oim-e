import ContentData from '@/platform/vue/view/model/chat/content/ContentData';

class BaseChatViewModel {
    public key = '';
    public showPrompt = false;
    public prompt = '';
    public nameVisible = false;
    public list: ContentData[] = [];

    public messageInfo = {
        key: '',
        showPrompt: false,
        prompt: '',
        lastTimestamp: 0,
        showNameVisible: false,
        list: [] as ContentData[],
    };

    public initialize() {

    }
}
