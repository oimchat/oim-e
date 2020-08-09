import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import User from '@/app/com/main/module/business/user/bean/User';
import ViewEnum from '@/app/com/client/common/view/ViewEnum';
import MessageListView from '@/app/com/client/module/message/view/MessageListView';
import ContactRelation from '@/app/com/main/module/business/contact/bean/ContactRelation';
import BaseUtil from '@/app/lib/util/BaseUtil';
import UserInfoUtil from '@/app/com/main/common/util/UserInfoUtil';
import ContactRelationBox from '@/app/com/main/module/business/contact/box/ContactRelationBox';
import UserBox from '@/app/com/main/module/business/user/box/UserBox';
import UserChatItemEvent from '@/app/com/main/module/common/event/UserChatItemEvent';

export default class UserChatItemManager extends AbstractMaterial {
    private type = 'user_chat';

    public showUserChatItemById(userId: string) {
        this.addOrUpdateChatItemById(userId);
        this.selectItem(userId);
    }

    public showUserChatItem(user: User) {
        this.addOrUpdate(user);
        this.selectItem(user.id);
    }

    public addOrUpdateChatItemById(userId: string) {
        const userBox: UserBox = this.appContext.getMaterial(UserBox);
        const user: User = userBox.getUser(userId);
        if (user) {
            this.addOrUpdate(user);
        }
    }

    public addOrUpdate(user: User) {
        if (user) {
            const contactListBox: ContactRelationBox = this.appContext.getMaterial(ContactRelationBox);
            const relation: ContactRelation = contactListBox.getContactRelationByUserId(user.id);
            this.addOrUpdateInfo(user, relation);
        }
    }

    public addOrUpdateInfo(user: User, relation: ContactRelation) {
        if (user) {
            const userId = user.id;
            let name = '';
            const avatar = UserInfoUtil.getHeadImage(user);
            const status = user.status;
            const gray = UserInfoUtil.isOffline(status);

            if (relation) {
                name = relation.remark;
            }

            if (BaseUtil.isEmpty(name)) {
                name = UserInfoUtil.getShowName(user);
            }

            const userChatItemEvent: UserChatItemEvent = this.appContext.getMaterial(UserChatItemEvent);

            const messageListView: MessageListView = this.appContext.getView(ViewEnum.MessageListView);
            messageListView.addOrUpdateItem(this.type, userId, name, avatar, gray, (key: string) => {
                userChatItemEvent.onSelect(key);
            }, (key: string) => {
                userChatItemEvent.onDelete(key);
            });
        }
    }

    public selectItem(userId: string) {
        const messageListView: MessageListView = this.appContext.getView(ViewEnum.MessageListView);
        messageListView.selectItem(this.type, userId);
    }

    public hasItem(userId: string): boolean {
        const messageListView: MessageListView = this.appContext.getView(ViewEnum.MessageListView);
        return messageListView.hasItem(this.type, userId);
    }

    public deleteItem(userId: string) {
        const messageListView: MessageListView = this.appContext.getView(ViewEnum.MessageListView);
        messageListView.removeItem(this.type, userId);
    }

    public updateItemText(userId: string, text: string, timeText: string, timestamp: number): void {
        const messageListView: MessageListView = this.appContext.getView(ViewEnum.MessageListView);
        messageListView.updateItemText(this.type, userId, text, timeText, timestamp);
    }

    public setItemRed(userId: string, red: boolean, count: number): void {
        const messageListView: MessageListView = this.appContext.getView(ViewEnum.MessageListView);
        messageListView.setItemRed(this.type, userId, red, count);
    }
}
