import ContentWrap from '@/common/vue/data/content/ContentWrap';

export default class MessageData {
    public promptShow = false;
    public promptText = '';
    public promptKey = '';
    public lastTimestamp: number = 0;
    public list: ContentWrap[] = [];
}
