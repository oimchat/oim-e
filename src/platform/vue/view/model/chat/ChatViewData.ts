import MessageContentWrap from '@/common/vue/data/content/impl/message/MessageContentWrap';

export default class ChatViewData {

    public key = '';
    public showPrompt = false;
    public prompt = '';
    public nameVisible = false;
    public list: MessageContentWrap[] = [];

}
