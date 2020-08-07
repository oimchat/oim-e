import ChatMessageModel from '@/impl/data/ChatMessageModel';
import User from '@/app/com/main/module/business/user/bean/User';
import ContentData from '@/platform/vue/view/model/chat/content/ContentData';
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

