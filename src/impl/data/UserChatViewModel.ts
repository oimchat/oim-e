import User from '@/app/com/main/module/business/user/bean/User';
import Content from '@/app/com/common/chat/Content';
import ChatViewModel from '@/impl/data/ChatViewModel';
import app from '@/app/App';
import MessageAppendUserSetting from '@/app/com/main/module/setting/message/MessageAppendUserSetting';
import MessageAppendType from '@/app/com/main/module/setting/message/type/MessageAppendType';
import UserChatDataController from '@/app/com/main/module/business/chat/controller/UserChatDataController';
import UserChatController from '@/app/com/main/module/business/chat/controller/UserChatController';
import DataBackAction from '@/app/base/net/DataBackAction';
import MessageStatusType from '@/common/vue/data/content/impl/message/MessageStatusType';

class UserChatViewModel extends ChatViewModel {

    public setUser(user: User) {
        const userId = (user) ? user.id : '';
        this.setChat(userId);
        this.chatData.key = userId;
        this.chatData.avatar = user.avatar;
        this.chatData.text = user.signature;
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

    public loadHistory() {
        let messageKey = '';
        const userId = this.chatData.key;
        if (this.data.list && this.data.list.length > 0) {
            messageKey = this.geFirstMessageKey(userId);
            // 历史记录时记录当前聊天界面的id
            this.cacheData.data.lastMessageKey = messageKey;

            const length = this.data.list.length;
            if (length < 500) {
                const userChatController: UserChatDataController = app.appContext.getMaterial(UserChatDataController);
                userChatController.loadHistory(userId, messageKey, 20);
            } else {
                this.data.prompt = '更多内容请看历史记录。';
                if (!this.data.showPrompt) {
                    this.data.showPrompt = true;
                    setTimeout(() => {
                        this.data.showPrompt = false;
                    }, 3000);
                }
            }
        }
    }

    public send(c: Content, back: (success: boolean, message: string) => void) {
        if (c) {
            const own = this;
            this.handleSend(c, (success, key, content, message) => {
                if (success) {
                    const sendBack: DataBackAction = {
                        lost(data: any): void {
                            own.updateStatus(key, content.key, MessageStatusType.fail);
                        }, timeOut(data: any): void {
                            own.updateStatus(key, content.key, MessageStatusType.fail);
                        },
                    } as DataBackAction;
                    const userChatController: UserChatController = app.appContext.getMaterial(UserChatController);
                    userChatController.userChat(key, content, sendBack);
                }
                back(success, message);
            });
        } else {
            back(false, '消息不能为空！');
        }
    }
}

export default new UserChatViewModel();
