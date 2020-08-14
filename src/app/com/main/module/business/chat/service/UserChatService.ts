import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import User from '@/app/com/main/module/business/user/bean/User';
import UserChatManager from '@/app/com/main/module/business/chat/manager/UserChatManager';
import Content from '@/app/com/common/chat/Content';
import PersonalBox from '@/app/com/main/module/business/personal/box/PersonalBox';
import UserChatInfoManager from '@/app/com/main/module/business/chat/manager/UserChatInfoManager';
import UserChatItemManager from '@/app/com/main/module/business/chat/manager/UserChatItemManager';
import UserMessageUnreadBox from '@/app/com/main/module/business/chat/box/unread/UserMessageUnreadBox';
import CoreContentUtil from '@/app/com/common/chat/util/CoreContentUtil';
import PromptManager from '@/app/com/client/module/prompt/manager/PromptManager';
import SoundType from '@/app/com/client/define/prompt/SoundType';
import AllMessageUnreadBox from '@/app/com/client/module/information/box/unread/AllMessageUnreadBox';
import UserChatDataSender from '@/app/com/main/module/business/chat/sender/UserChatDataSender';
import VoicePromptUserSetting from '@/app/com/main/module/setting/prompt/VoicePromptUserSetting';
import VoicePromptType from '@/app/com/main/module/setting/prompt/type/VoicePromptType';
import UserAccess from '@/app/com/main/module/business/user/access/UserAccess';
import ContactAccess from '@/app/com/main/module/business/contact/access/ContactAccess';
import UserInfoUtil from '@/app/com/main/common/util/UserInfoUtil';


export default class UserChatService extends AbstractMaterial {

    public chat(isReceive: boolean, sendUserId: string, receiveUserId: string, content: Content) {
        const own = this;
        const userAccess: UserAccess = this.appContext.getMaterial(UserAccess);
        const contactAccess: ContactAccess = this.appContext.getMaterial(ContactAccess);
        const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);

        const ownUserId = pb.getUserId();
        const ownUser: User = pb.getUser();
        const isChatUserOwn: boolean = sendUserId === ownUserId;

        const showUserId: string = (isChatUserOwn) ? receiveUserId : sendUserId;

        const isShowUserContact = contactAccess.isContact(showUserId);

        userAccess.getUserById(showUserId, (success: boolean, message: string, user: User) => {
            if (!success || !user) {

                user = new User();
                user.id = showUserId;
                user.nickname = isShowUserContact ? '加载失败的联系人' : '加载失败的临时会话用户';
                user.avatar = UserInfoUtil.getDefaultAvatar();
            }
            const showUser: User = user;
            const chatUser: User = (isChatUserOwn) ? ownUser : user;
            own.showChatMessage(isReceive, sendUserId, receiveUserId, isChatUserOwn, showUser, chatUser, content);
        });

        // const ud: User = ub.getUser(showUserId);
        //
        // const showUserData: User = ud;
        // const chatUserData: User = (isChatUserOwn) ? ownUser : ud;
        //
        // if (null == showUserData) {
        //     const dataBackAction: DataBackAction = {
        //         back(data: any): void {
        //             if (data && data.body) {
        //
        //                 const user: User = data.body.user;
        //                 if (null != user) {
        //                     ub.putUser(user);
        //                     const showUser = user;
        //                     const chatUser = (isChatUserOwn) ? ownUser : user;
        //                     own.showChatMessage(isReceive, sendUserId, receiveUserId, isChatUserOwn, showUser, chatUser, content);
        //                 }
        //             }
        //         },
        //     } as DataBackAction;
        //     const userSender: UserSender = this.appContext.getMaterial(UserSender);
        //     userSender.getUser(showUserId, dataBackAction);
        // } else {
        //     this.showChatMessage(isReceive, sendUserId, receiveUserId, isChatUserOwn, showUserData, chatUserData, content);
        // }
    }

    public showChatMessage(
        isReceive: boolean,
        sendUserId: string,
        receiveUserId: string,
        isOwn: boolean,
        showUser: User,
        chatUser: User,
        content: Content) {
        const userId = showUser.id;
        const ucm: UserChatManager = this.appContext.getMaterial(UserChatManager);
        ucm.chat(isReceive, isOwn, showUser, chatUser, content);

        const userChatInfoManager: UserChatInfoManager = this.appContext.getMaterial(UserChatInfoManager);
        const userChatItemManager: UserChatItemManager = this.appContext.getMaterial(UserChatItemManager);
        const userMessageUnreadBox: UserMessageUnreadBox = this.appContext.getMaterial(UserMessageUnreadBox);
        const allMessageUnreadBox: AllMessageUnreadBox = this.appContext.getMaterial(AllMessageUnreadBox);

        const showTime = CoreContentUtil.getChatShowTime(content.timestamp);
        const text = CoreContentUtil.getText(content);

        if (!userChatItemManager.hasItem(userId)) {
            userChatItemManager.addOrUpdate(showUser);
        }
        const timestamp = content.timestamp;
        userChatItemManager.updateItemText(userId, text, showTime, timestamp);
        const isChatShowing: boolean = userChatInfoManager.isChatShowing(userId);

        if ((!isChatShowing) && !isOwn) {
            userMessageUnreadBox.plusUnread(userId);
            // allMessageUnreadBox.plusUnread(1);

            const totalUnreadCount = allMessageUnreadBox.getTotalUnreadCount();
            const unreadCount = userMessageUnreadBox.getUnreadCount(userId);
            const red = unreadCount > 0;
            userChatItemManager.setItemRed(userId, red, unreadCount);

            // promptManager.put()
        } else if (!isOwn) {
            const contentId = content.id;
            const userChatDataSender: UserChatDataSender = this.appContext.getMaterial(UserChatDataSender);
            userChatDataSender.updateToReadByContentId(receiveUserId, sendUserId, contentId);
        }

        if (!isOwn) {
            const userVoicePromptSetting: VoicePromptUserSetting = this.appContext.getMaterial(VoicePromptUserSetting);

            const voicePromptType = userVoicePromptSetting.getType(userId);
            if (VoicePromptType.unread === voicePromptType) {
                if ((!isChatShowing) && !isOwn) {
                    const promptManager: PromptManager = this.appContext.getMaterial(PromptManager);
                    promptManager.playSound(SoundType.Message);
                }
            } else if (VoicePromptType.always === voicePromptType) {
                const promptManager: PromptManager = this.appContext.getMaterial(PromptManager);
                promptManager.playSound(SoundType.Message);
            }
        }
    }

    public loadHistory(userId: string, startMessageKey: string, count: number) {
        const ucm: UserChatManager = this.appContext.getMaterial(UserChatManager);
        ucm.loadHistory(userId, startMessageKey, count);
    }
}
