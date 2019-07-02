import Font from '@/app/com/data/chat/content/Font';
import Section from '@/app/com/data/chat/content/Section';

export default class Content {
    /**
     * 聊天消息的id
     */
    public key: string = '';
    /**
     * 字体信息
     */
    public font: Font = new Font();
    /**
     * 段落，段落是指聊天内容有换行分段
     */
    public sections: Section[] = [];
    /**
     * 发送的时间戳
     */
    public timestamp: number = 0;
}
