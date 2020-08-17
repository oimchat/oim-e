import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import User from '@/app/com/main/module/business/user/bean/User';
import WorkViewEnum from '@/app/com/common/view/WorkViewEnum';
import MessageListView from '@/app/com/client/module/message/view/MessageListView';
import ContactRelation from '@/app/com/main/module/business/contact/bean/ContactRelation';
import BaseUtil from '@/app/lib/util/BaseUtil';
import UserInfoUtil from '@/app/com/main/common/util/UserInfoUtil';
import ContactRelationBox from '@/app/com/main/module/business/contact/box/ContactRelationBox';
import UserChatItemEvent from '@/app/com/main/module/common/event/UserChatItemEvent';
import Prompter from '@/app/com/client/component/Prompter';
import UserAccess from '@/app/com/main/module/business/user/access/UserAccess';
import AppContext from '@/app/base/context/AppContext';
import UserMessageUnreadBox from '@/app/com/main/module/business/chat/box/unread/UserMessageUnreadBox';
import DataChange from '@/app/base/event/DataChange';

export default class UserChatItemManager extends AbstractMaterial {

    private type = 'user_chat';

    public constructor(protected appContext: AppContext) {
        super(appContext);
        const own = this;
        const c = {
            change(data: { key: string; unreadCount: number }): void {
                const red = data.unreadCount > 0;
                own.setItemRed(data.key, red, data.unreadCount);
            },
        } as DataChange<{ key: string, unreadCount: number }>;
        const userMessageUnreadBox: UserMessageUnreadBox = this.appContext.getMaterial(UserMessageUnreadBox);
        userMessageUnreadBox.addChangeEvent(c);
    }

    public showUserChatItemById(userId: string) {
        this.addOrUpdateChatItemById(userId);
        this.selectItem(userId);
    }

    public addOrUpdateChatItemById(userId: string) {
        const own = this;
        const prompter: Prompter = this.appContext.getMaterial(Prompter);
        const userAccess: UserAccess = this.appContext.getMaterial(UserAccess);
        userAccess.getUserById(userId, (success, message: string, user) => {
            if (success) {
                own.addOrUpdate(user);
            } else {
                prompter.warn('加载用户失败');
            }
        });
    }


    public showUserChatItem(user: User) {
        this.addOrUpdate(user);
        this.selectItem(user.id);
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

            const messageListView: MessageListView = this.appContext.getView(WorkViewEnum.MessageListView);
            messageListView.addOrUpdateItem(this.type, userId, name, avatar, gray, user, (key: string) => {
                userChatItemEvent.onSelect(key);
            }, (key: string) => {
                userChatItemEvent.onDelete(key);
            });
        }
    }

    public selectItem(userId: string) {
        const messageListView: MessageListView = this.appContext.getView(WorkViewEnum.MessageListView);
        messageListView.selectItem(this.type, userId);
    }

    public hasItem(userId: string): boolean {
        const messageListView: MessageListView = this.appContext.getView(WorkViewEnum.MessageListView);
        return messageListView.hasItem(this.type, userId);
    }

    public deleteItem(userId: string) {
        const messageListView: MessageListView = this.appContext.getView(WorkViewEnum.MessageListView);
        messageListView.removeItem(this.type, userId);
    }

    public updateItemText(userId: string, text: string, timeText: string, timestamp: number): void {
        const messageListView: MessageListView = this.appContext.getView(WorkViewEnum.MessageListView);
        messageListView.updateItemText(this.type, userId, text, timeText, timestamp);
    }

    public setItemRed(userId: string, red: boolean, count: number): void {
        const messageListView: MessageListView = this.appContext.getView(WorkViewEnum.MessageListView);
        messageListView.setItemRed(this.type, userId, red, count);
    }
}
