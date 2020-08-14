import MessageContentWrap from '@/common/vue/data/content/impl/message/MessageContentWrap';
import ContentWrap from '@/common/vue/data/content/ContentWrap';

class BaseChatViewModel {
    public key = '';
    public showPrompt = false;
    public prompt = '';
    public nameVisible = false;
    public list: MessageContentWrap[] = [];

    public messageInfo = {
        key: '',
        showPrompt: false,
        prompt: '',
        lastTimestamp: 0,
        showNameVisible: false,
        list: [] as ContentWrap[],
    };

    public initialize() {
        // no
    }
}
