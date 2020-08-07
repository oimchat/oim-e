import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import User from '@/app/com/main/module/business/user/bean/User';
import UserChatInfoManager from '@/app/com/main/module/business/chat/manager/UserChatInfoManager';
import UserChatItemManager from '@/app/com/main/module/business/chat/manager/UserChatItemManager';
import UserMessageUnreadBox from '@/app/com/main/module/business/chat/box/unread/UserMessageUnreadBox';
import AllMessageUnreadBox from '@/app/com/client/module/information/box/unread/AllMessageUnreadBox';
import MessageAllUnreadManager from '@/app/com/main/manager/MessageAllUnreadManager';
import UserChatManager from '@/app/com/main/module/business/chat/manager/UserChatManager';
import UserChatDataSender from '@/app/com/main/module/business/chat/sender/UserChatDataSender';
import PersonalBox from '@/app/com/main/module/business/personal/box/PersonalBox';


export default class UserChatInfoService extends AbstractMaterial {

    public showUserChatById(userId: string) {
        const userChatInfoManager: UserChatInfoManager = this.appContext.getMaterial(UserChatInfoManager);
        userChatInfoManager.showUserChatById(userId);

        const userChatManager: UserChatManager = this.appContext.getMaterial(UserChatManager);
        const userChatItemManager: UserChatItemManager = this.appContext.getMaterial(UserChatItemManager);
        const userMessageUnreadBox: UserMessageUnreadBox = this.appContext.getMaterial(UserMessageUnreadBox);
        const allMessageUnreadBox: AllMessageUnreadBox = this.appContext.getMaterial(AllMessageUnreadBox);
        const messageAllUnreadManager: MessageAllUnreadManager = this.appContext.getMaterial(MessageAllUnreadManager);

        const unreadCount = userMessageUnreadBox.getUnreadCount(userId);
        // allMessageUnreadBox.minusUnread(unreadCount);

        const totalUnreadCount = allMessageUnreadBox.getTotalUnreadCount();
        const totalRed = totalUnreadCount > 0;
        messageAllUnreadManager.setMessageItemRed(totalRed, totalUnreadCount);

        userMessageUnreadBox.setUnreadCount(userId, 0);
        userChatItemManager.setItemRed(userId, false, 0);

        userChatManager.firstLoadHistory(userId, '', 10);

        const personalBox: PersonalBox = this.appContext.getMaterial(PersonalBox);
        const receiveUserId = personalBox.getUserId();
        const sendUserId = userId;
        // 标记消息已读
        const userChatDataSender: UserChatDataSender = this.appContext.getMaterial(UserChatDataSender);
        userChatDataSender.updateToReadBySendUserId(receiveUserId, sendUserId);
    }

    public showUserChat(user: User) {
        const userId = user.id;
        this.showUserChatById(userId);
    }
}
