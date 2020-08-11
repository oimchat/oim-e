import Font from '@/app/com/common/chat/Font';
import Section from '@/app/com/common/chat/Section';

class MessageContent {

    /**
     * 聊天消息的id
     */
    public id: string = '';
    /**
     * 聊天消息的key
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
