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
import CoreContentUtil from '@/app/com/common/chat/util/CoreContentUtil';
import ChatCacheData from '@/platform/vue/view/model/chat/ChatCacheData';
import Item from '@/app/com/common/chat/Item';
import AtValue from '@/app/com/common/chat/item/AtValue';
import PersonalBox from '@/app/com/main/module/business/personal/box/PersonalBox';

class GroupChatViewModel extends ChatViewModel {


    public atInfo: { show: boolean, chatUserName: string, chatText: string, messageKey: string }
        = {show: false, chatUserName: '', chatText: '', messageKey: ''};
    private atMap: Map<string, { show: boolean, chatUserName: string, chatText: string, messageKey: string }> = new Map<string, { show: boolean, chatUserName: string, chatText: string, messageKey: string }>();

    public nodeClear() {
        // no
    }

    public setGroup(group: Group) {
        const groupId = (group) ? group.id : '';
        this.setChat(groupId);
        this.info.key = groupId;
        this.info.avatar = group.avatar;
        this.info.text = group.introduce;
        this.viewData.nameVisible = true;

        const atInfo = this.getOrCreateAtData(groupId);
        this.atInfo = atInfo;
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
        if (!isOwn) {
            this.handleAt(showName, chatUser, content);
        }
    }

    public loadHistory() {
        let messageKey = '';
        const groupId = this.info.key;
        if (this.messageData.list && this.messageData.list.length > 0) {
            messageKey = this.geFirstMessageKey(groupId);
            // 历史记录时记录当前聊天界面的id
            this.viewData.data.lastMessageKey = messageKey;

            const length = this.messageData.list.length;
            if (length < 500) {
                const groupChatController: GroupChatDataController = app.appContext.getMaterial(GroupChatDataController);
                groupChatController.loadHistory(groupId, messageKey, 20);
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
        const groupChatController: GroupChatController = app.appContext.getMaterial(GroupChatController);
        groupChatController.chat(key, content, sendBack);
    }

    private handleAt(showName: string, chatUser: User, content: Content) {

        const personalBox = app.appContext.getMaterial(PersonalBox);
        const ownId = personalBox.getUserId();
        const items = CoreContentUtil.getItemList(content, Item.TYPE_AT);
        let has = false;
        if (items && items.length > 0) {
            for (const item of items) {
                if (item.value instanceof AtValue) {
                    const atValue = item.value;
                    if ('0' === atValue.userId || ownId === atValue.userId) {
                        has = true;
                        break;
                    }
                }
            }
        }
        if (has) {
            let text = CoreContentUtil.getText(content);
            if (text && text.length > 100) {
                text = text.substring(0, 99) + '...';
            }
            this.atInfo.messageKey = content.key;
            this.atInfo.chatUserName = showName;
            this.atInfo.chatText = text;
            this.atInfo.show = has;
        }
    }

    private getOrCreateAtData(key: string): { show: boolean, chatUserName: string, chatText: string, messageKey: string } {
        let data = this.atMap.get(key);
        if (!data) {
            data = {show: false, chatUserName: '', chatText: '', messageKey: ''};
            this.atMap.set(key, data);
        }
        return data;
    }
}

export default new GroupChatViewModel();
