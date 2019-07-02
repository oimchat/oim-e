import User from '@/app/com/bean/User';
import ContentData from '@/views/common/chat/ContentData';
import Content from '@/app/com/data/chat/content/Content';
import ChatViewModel from '@/impl/data/ChatViewModel';


class UserChatViewModel extends ChatViewModel {

    public setUser(user: User) {
        const userId = (user) ? user.id : '';
        this.setChat(userId);
        this.chatData.key = userId;
    }

    public setName(name: string) {
        this.chatData.name = name;
    }
}

export default new UserChatViewModel();
