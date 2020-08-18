import Group from '@/app/com/main/module/business/group/bean/Group';
import ChatViewModel from '@/platform/vue/view/model/ChatViewModel';
import User from '@/app/com/main/module/business/user/bean/User';
import Content from '@/app/com/common/chat/Content';
import app from '@/app/App';
import MessageAppendType from '@/app/com/main/module/setting/message/type/MessageAppendType';
import MessageAppendGroupSetting from '@/app/com/main/module/setting/message/MessageAppendGroupSetting';
import GroupChatDataController from '@/app/com/main/module/business/chat/controller/GroupChatDataController';
import DataBackAction from '@/app/base/net/DataBackAction';
import MessageStatusType from '@/common/vue/data/content/impl/message/MessageStatusType';
import GroupChatController from '@/app/com/main/module/business/chat/controller/GroupChatController';

class GroupChatViewModel extends ChatViewModel {


    public nodeClear() {
        // no
    }

    public setGroup(group: Group) {
        const groupId = (group) ? group.id : '';
        this.setChat(groupId);
        this.info.key = groupId;
        this.info.avatar = group.avatar;
        this.info.text = group.introduce;
        this.messageInfo.nameVisible = true;
    }

    public setName(name: string) {
        this.info.name = name;
    }

    public insertLast(isReceive: boolean, isOwn: boolean, key: string, showName: string, chatUser: User, content: Content): void {
        super.insertLast(isReceive, isOwn, key, showName, chatUser, content);
        const setting: MessageAppendGroupSetting = app.appContext.getMaterial(MessageAppendGroupSetting);
        const type = setting.getType(key);
        if (MessageAppendType.bottom === type) {
            this.toScrollBottom();
        }
    }

    public loadHistory() {
        let messageKey = '';
        const groupId = this.info.key;
        if (this.messageInfo.list && this.messageInfo.list.length > 0) {
            messageKey = this.geFirstMessageKey(groupId);
            // 历史记录时记录当前聊天界面的id
            this.viewData.data.lastMessageKey = messageKey;

            const length = this.messageInfo.list.length;
            if (length < 500) {
                const groupChatController: GroupChatDataController = app.appContext.getMaterial(GroupChatDataController);
                groupChatController.loadHistory(groupId, messageKey, 20);
            } else {
                this.messageInfo.prompt = '更多内容请看历史记录。';
                if (!this.messageInfo.showPrompt) {
                    this.messageInfo.showPrompt = true;
                    setTimeout(() => {
                        this.messageInfo.showPrompt = false;
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
        const groupChatController: GroupChatController = app.appContext.getMaterial(GroupChatController);
        groupChatController.chat(key, content, sendBack);
    }
}

export default new GroupChatViewModel();
