import User from '@/app/com/main/module/business/user/bean/User';
import Content from '@/app/com/common/chat/Content';
import ChatViewModel from '@/platform/vue/view/model/ChatViewModel';
import app from '@/app/App';
import MessageAppendUserSetting from '@/app/com/main/module/setting/message/MessageAppendUserSetting';
import MessageAppendType from '@/app/com/main/module/setting/message/type/MessageAppendType';
import UserChatDataController from '@/app/com/main/module/business/chat/controller/UserChatDataController';
import UserChatController from '@/app/com/main/module/business/chat/controller/UserChatController';
import DataBackAction from '@/app/base/net/DataBackAction';
import MessageStatusType from '@/common/vue/data/content/impl/message/MessageStatusType';
import PersonalBox from '@/app/com/main/module/business/personal/box/PersonalBox';

class UserChatViewModel extends ChatViewModel {

    public setUser(user: User) {
        const userId = (user) ? user.id : '';
        this.setChat(userId);
        this.info.key = userId;
        this.info.avatar = user.avatar;
        this.info.text = user.signature;
    }

    public setName(name: string) {
        this.info.name = name;
    }


    public insertLast(isReceive: boolean, isOwn: boolean, key: string, showName: string, chatUser: User, content: Content): void {
        super.insertLast(isReceive, isOwn, key, showName, chatUser, content);
        const setting: MessageAppendUserSetting = app.appContext.getMaterial(MessageAppendUserSetting);
        const type = setting.getType(key);
        if (MessageAppendType.bottom === type) {
            this.toScrollBottom();
        }
    }

    public loadHistory() {
        let messageKey = '';
        const userId = this.info.key;
        if (this.messageData.list && this.messageData.list.length > 0) {
            messageKey = this.geFirstMessageKey(userId);
            // 历史记录时记录当前聊天界面的id
            this.viewData.data.lastMessageKey = messageKey;

            const length = this.messageData.list.length;
            if (length < 500) {
                const userChatController: UserChatDataController = app.appContext.getMaterial(UserChatDataController);
                userChatController.loadHistory(userId, messageKey, 20);
            } else {
                this.messageData.promptKey = messageKey;
                this.messageData.promptText = '更多内容请看历史记录。';
                if (!this.messageData.promptShow) {
                    this.messageData.promptShow = true;
                    setTimeout(() => {
                        this.messageData.promptShow = false;
                    }, 3000);
                }
            }
        }
    }


    protected doSend(key: string, content: Content) {
        const own = this;
        const sendBack: DataBackAction = {
            lost(data: any): void {
                own.updateStatus(key, content.key, MessageStatusType.fail);
            }, timeOut(data: any): void {
                own.updateStatus(key, content.key, MessageStatusType.fail);
            },
        } as DataBackAction;
        const userChatController: UserChatController = app.appContext.getMaterial(UserChatController);
        userChatController.chat(key, content, sendBack);
    }
}

const userChatViewModel: UserChatViewModel = new UserChatViewModel();
export default userChatViewModel;

