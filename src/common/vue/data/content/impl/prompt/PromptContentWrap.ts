import ContentWrap from '@/common/vue/data/content/ContentWrap';
import ContentWrapType from '@/common/vue/data/content/ContentWrapType';

export default class PromptContentWrap extends ContentWrap {

    public type: number = ContentWrapType.message;
    public id: string = '';
    public key: string = '';
    public text: string = '';
    public timeVisible: boolean = true;
    public timeText: string = '';
    /**
     * 时间戳
     */
    public timestamp: number = 0;

    public getTimestamp(): number {
        return this.timestamp;
    }
}
