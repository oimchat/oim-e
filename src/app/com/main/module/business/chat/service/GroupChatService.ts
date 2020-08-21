import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import User from '@/app/com/main/module/business/user/bean/User';
import GroupChatManager from '@/app/com/main/module/business/chat/manager/GroupChatManager';
import Content from '@/app/com/common/chat/Content';
import PersonalBox from '@/app/com/main/module/business/personal/box/PersonalBox';
import GroupChatInfoManager from '@/app/com/main/module/business/chat/manager/GroupChatInfoManager';
import GroupChatItemManager from '@/app/com/main/module/business/chat/manager/GroupChatItemManager';
import GroupMessageUnreadBox from '@/app/com/main/module/business/chat/box/unread/GroupMessageUnreadBox';
import CoreContentUtil from '@/app/com/common/chat/util/CoreContentUtil';
import PromptManager from '@/app/com/client/module/prompt/manager/PromptManager';
import SoundType from '@/app/com/client/define/prompt/SoundType';
import AllMessageUnreadBox from '@/app/com/client/module/information/box/unread/AllMessageUnreadBox';
import MessageAllUnreadManager from '@/app/com/client/module/information/manager/MessageAllUnreadManager';
import Group from '@/app/com/main/module/business/group/bean/Group';
import VoicePromptType from '@/app/com/main/module/setting/prompt/type/VoicePromptType';
import VoicePromptGroupSetting from '@/app/com/main/module/setting/prompt/VoicePromptGroupSetting';
import GroupRelationAccess from '@/app/com/main/module/business/group/access/GroupRelationAccess';
import GroupAccess from '@/app/com/main/module/business/group/access/GroupAccess';
import UserAccess from '@/app/com/main/module/business/user/access/UserAccess';
import ContactAccess from '@/app/com/main/module/business/contact/access/ContactAccess';
import UserInfoUtil from '@/app/com/main/common/util/UserInfoUtil';
import GroupInfoUtil from '@/app/com/main/common/util/GroupInfoUtil';


export default class GroupChatService extends AbstractMaterial {

    public chat(isReceive: boolean, sendUserId: string, user: User, groupId: string, content: Content) {
        const own = this;

        const groupRelationAccess: GroupRelationAccess = this.appContext.getMaterial(GroupRelationAccess);
        const groupAccess: GroupAccess = this.appContext.getMaterial(GroupAccess);

        const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);

        const ownUserId = pb.getUserId();
        const isChatUserOwn: boolean = sendUserId === ownUserId;
        const chatUserId: string = sendUserId;

        const isJoin = groupRelationAccess.isJoin(groupId);

        groupAccess.getGroupById(groupId, (success, message: string, g) => {
            if (!success || !g) {
                g = new Group();
                g.id = groupId;
                g.name = isJoin ? '加载失败的群' : '加载失败的临时群';
                g.avatar = GroupInfoUtil.getDefaultAvatar();
            }
            own.showChat(isReceive, isChatUserOwn, g, chatUserId, user, content);
        });


        // const group = gb.getGroup(groupId);
        //
        // if (!group) {
        //     return;
        // }

        // const ud: User = ub.getUser(sendUserId);
        // const chatUserData: User = (isChatUserOwn) ? ownUser : ud;
        //
        // if (null == chatUserData) {
        //     const dataBackAction: DataBackAction = {
        //         back(data: any): void {
        //             if (data && data.body) {
        //
        //                 const user: User = data.body;
        //                 if (null != user) {
        //                     ub.putUser(user);
        //                     const chatUser = (isChatUserOwn) ? ownUser : user;
        //                     own.showChatMessage(isReceive, isChatUserOwn, group, chatUser, content);
        //                 }
        //             }
        //         },
        //     } as DataBackAction;
        //     const userSender: UserSender = this.appContext.getMaterial(UserSender);
        //     userSender.getUser(sendUserId, dataBackAction);
        // } else {
        //     this.showChatMessage(isReceive, isChatUserOwn, group, chatUserData, content);
        // }
    }

    public showChat(isReceive: boolean, isChatUserOwn: boolean, group: Group, chatUserId: string, chatUser: User, content: Content) {

        const own = this;
        const userAccess: UserAccess = this.appContext.getMaterial(UserAccess);
        const contactAccess: ContactAccess = this.appContext.getMaterial(ContactAccess);
        const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);
        const ownUser: User = pb.getUser();

        chatUser = (isChatUserOwn) ? ownUser : chatUser;

        if (chatUser && chatUser.id) {
            own.showChatMessage(isReceive, isChatUserOwn, group, chatUser, content);
        } else {
            const isShowUserContact = contactAccess.isContact(chatUserId);
            userAccess.getUserById(chatUserId, (success: boolean, message: string, user: User) => {
                if (!success || !user) {
                    user = new User();
                    user.id = chatUserId;
                    user.nickname = '加载失败的成员';
                    user.avatar = UserInfoUtil.getDefaultAvatar();
                }
                chatUser = user;
                own.showChatMessage(isReceive, isChatUserOwn, group, chatUser, content);
            });
        }
    }

    public showChatMessage(isReceive: boolean, isOwn: boolean, group: Group, chatUser: User, content: Content) {
        const groupId = group.id;
        const ucm: GroupChatManager = this.appContext.getMaterial(GroupChatManager);
        ucm.chat(isReceive, isOwn, group, chatUser, content);
        const timestamp = content.timestamp;

        const groupChatInfoManager: GroupChatInfoManager = this.appContext.getMaterial(GroupChatInfoManager);
        const groupChatItemManager: GroupChatItemManager = this.appContext.getMaterial(GroupChatItemManager);
        const groupMessageUnreadBox: GroupMessageUnreadBox = this.appContext.getMaterial(GroupMessageUnreadBox);
        const allMessageUnreadBox: AllMessageUnreadBox = this.appContext.getMaterial(AllMessageUnreadBox);
        const messageAllUnreadManager: MessageAllUnreadManager = this.appContext.getMaterial(MessageAllUnreadManager);

        const showTime = CoreContentUtil.getChatShowTime(content.timestamp);
        const text = CoreContentUtil.getText(content);

        if (!groupChatItemManager.hasItem(groupId)) {
            groupChatItemManager.addOrUpdate(group);
        }

        groupChatItemManager.updateItemText(groupId, text, showTime, timestamp);
        const isChatShowing: boolean = groupChatInfoManager.isChatShowing(groupId);
        if ((!isChatShowing) && !isOwn) {
            groupMessageUnreadBox.plusUnread(groupId);
            // allMessageUnreadBox.plusUnread(1);

            const totalUnreadCount = allMessageUnreadBox.getTotalUnreadCount();
            const unreadCount = groupMessageUnreadBox.getUnreadCount(groupId);
            const red = unreadCount > 0;
            groupChatItemManager.setItemRed(groupId, red, unreadCount);

            const promptManager: PromptManager = this.appContext.getMaterial(PromptManager);
            promptManager.playSound(SoundType.Message);
            // promptManager.put()
        }
        if (!isOwn) {
            const groupVoicePromptSetting: VoicePromptGroupSetting = this.appContext.getMaterial(VoicePromptGroupSetting);

            const voicePromptType = groupVoicePromptSetting.getType(groupId);
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

    public loadHistory(groupId: string, startMessageKey: string, count: number) {
        const ucm: GroupChatManager = this.appContext.getMaterial(GroupChatManager);
        ucm.loadHistory(groupId, startMessageKey, count);
    }
}
