import User from '@/app/com/bean/User';
import Content from '@/app/com/data/chat/content/Content';
import ChatViewModel from '@/impl/data/ChatViewModel';
import app from '@/app/App';
import MessageAppendUserSetting from '@/app/com/main/setting/message/MessageAppendUserSetting';
import MessageAppendType from '@/app/com/main/setting/message/type/MessageAppendType';

class UserChatViewModel extends ChatViewModel {

    public setUser(user: User) {
        const userId = (user) ? user.id : '';
        this.setChat(userId);
        this.chatData.key = userId;
    }

    public setName(name: string) {
        this.chatData.name = name;
    }


    public insertLast(isReceive: boolean, isOwn: boolean, key: string, showName: string, chatUser: User, content: Content): void {
        super.insertLast(isReceive, isOwn, key, showName, chatUser, content);
        const setting: MessageAppendUserSetting = app.appContext.getMaterial(MessageAppendUserSetting);
        const type = setting.getType(key);
        if (MessageAppendType.bottom === type) {
            if (typeof this.cacheData.updateScroll === 'function') {
                setTimeout(() => {
                    const h = this.cacheData.getScrollHeight();
                    this.cacheData.updateScroll(h);
                }, 50);
            }
        }
    }
}

export default new UserChatViewModel();
