import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import PersonalBox from '@/app/com/main/module/business/personal/box/PersonalBox';
import UserChatDataSender from '@/app/com/main/module/business/chat/sender/UserChatDataSender';
import UserMessageUnreadBox from '@/app/com/main/module/business/chat/box/unread/UserMessageUnreadBox';

export default class UserChatOpenManager extends AbstractMaterial {

    public openUserChatById(userId: string) {
        const userMessageUnreadBox: UserMessageUnreadBox = this.appContext.getMaterial(UserMessageUnreadBox);
        userMessageUnreadBox.setUnreadCount(userId, 0);

        const personalBox: PersonalBox = this.appContext.getMaterial(PersonalBox);
        const receiveUserId = personalBox.getUserId();
        const sendUserId = userId;
        // 标记消息已读
        const userChatDataSender: UserChatDataSender = this.appContext.getMaterial(UserChatDataSender);
        userChatDataSender.updateToReadBySendUserId(receiveUserId, sendUserId);
    }
}
