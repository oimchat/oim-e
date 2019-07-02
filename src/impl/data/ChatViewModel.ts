import ChatMessageModel from '@/impl/data/ChatMessageModel';
import User from '@/app/com/bean/User';
import ContentData from '@/views/common/chat/ContentData';
import Content from '@/app/com/data/chat/content/Content';

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

