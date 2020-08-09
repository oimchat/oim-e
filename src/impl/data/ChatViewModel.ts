import ChatMessageModel from '@/impl/data/ChatMessageModel';
import User from '@/app/com/main/module/business/user/bean/User';
import MessageContentWrap from '@/common/vue/data/content/impl/message/MessageContentWrap';
import Content from '@/app/com/common/chat/Content';

export default class ChatViewModel extends ChatMessageModel {
    public chatData = {
        name: '',
        key: '',
    };

    public setUser(user: User) {
        const userId = (user) ? user.id : '';
        this.setChat(userId);
    }


    public setName(name: string) {
        this.chatData.name = name;
    }
}

