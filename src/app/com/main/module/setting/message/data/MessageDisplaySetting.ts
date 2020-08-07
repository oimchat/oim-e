import MessageAppendType from '@/app/com/main/module/setting/message/type/MessageAppendType';

class MessageDisplaySetting {

    /**
     * 当前聊天界面消息展示方式
     */
    public appendType: number = MessageAppendType.last;
    /**
     * 切换界面消息展示方式
     */
    public switchType: number = MessageAppendType.last;
}

export default MessageDisplaySetting;
