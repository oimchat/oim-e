import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import User from '@/app/com/bean/User';
import UserBox from '@/app/com/main/box/UserBox';
import GroupChatManager from '@/app/com/main/manager/GroupChatManager';
import Content from '@/app/com/data/chat/content/Content';
import PersonalBox from '@/app/com/main/box/PersonalBox';
import DataBackAction from '@/app/base/net/DataBackAction';
import UserSender from '@/app/com/main/sender/UserSender';
import GroupChatInfoManager from '@/app/com/main/manager/GroupChatInfoManager';
import GroupChatItemManager from '@/app/com/main/manager/GroupChatItemManager';
import GroupMessageUnreadBox from '@/app/com/main/box/unread/GroupMessageUnreadBox';
import CoreContentUtil from '@/app/com/main/util/CoreContentUtil';
import PromptManager from '@/app/com/main/manager/PromptManager';
import SoundType from '@/app/define/prompt/SoundType';
import AllMessageUnreadBox from '@/app/com/main/box/unread/AllMessageUnreadBox';
import MessageAllUnreadManager from '@/app/com/main/manager/MessageAllUnreadManager';
import Group from '@/app/com/bean/Group';
import GroupBox from '@/app/com/main/box/GroupBox';
import VoicePromptType from '@/app/com/main/setting/prompt/type/VoicePromptType';
import VoicePromptGroupSetting from '@/app/com/main/setting/prompt/VoicePromptGroupSetting';


export default class GroupChatService extends AbstractMaterial {

    public chat(isReceive: boolean, sendUserId: string, groupId: string, content: Content) {
        const own = this;
        const ub: UserBox = this.appContext.getMaterial(UserBox);
        const gb: GroupBox = this.appContext.getMaterial(GroupBox);
        const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);

        const ownUserId = pb.getUserId();
        const ownUser: User = pb.getUser();
        const isOwn: boolean = sendUserId === ownUserId;

        const group = gb.getGroup(groupId);

        if (!group) {
            return;
        }

        const ud: User = ub.getUser(sendUserId);
        const chatUserData: User = (isOwn) ? ownUser : ud;

        if (null == chatUserData) {
            const dataBackAction: DataBackAction = {
                back(data: any): void {
                    if (data && data.body) {

                        const user: User = data.body;
                        if (null != user) {
                            ub.putUser(user);
                            const chatUser = (isOwn) ? ownUser : user;
                            own.showChatMessage(isReceive, isOwn, group, chatUser, content);
                        }
                    }
                },
            } as DataBackAction;
            const userSender: UserSender = this.appContext.getMaterial(UserSender);
            userSender.getUser(sendUserId, dataBackAction);
        } else {
            this.showChatMessage(isReceive, isOwn, group, chatUserData, content);
        }
    }

    public showChatMessage(isReceive: boolean, isOwn: boolean, group: Group, chatUser: User, content: Content) {
        const groupId = group.id;
        const ucm: GroupChatManager = this.appContext.getMaterial(GroupChatManager);
        ucm.chat(isReceive, isOwn, group, chatUser, content);

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

        groupChatItemManager.updateItemText(groupId, text, showTime);
        const isChatShowing: boolean = groupChatInfoManager.isChatShowing(groupId);
        const isTabShowing: boolean = messageAllUnreadManager.isMessageItemShowing();
        if ((!isChatShowing || !isTabShowing) && !isOwn) {
            groupMessageUnreadBox.plusUnread(groupId);
            // allMessageUnreadBox.plusUnread(1);

            const totalUnreadCount = allMessageUnreadBox.getTotalUnreadCount();
            const unreadCount = groupMessageUnreadBox.getUnreadCount(groupId);
            const red = unreadCount > 0;
            const totalRed = totalUnreadCount > 0;
            groupChatItemManager.setItemRed(groupId, red, unreadCount);
            messageAllUnreadManager.setMessageItemRed(totalRed, totalUnreadCount);

            const promptManager: PromptManager = this.appContext.getMaterial(PromptManager);
            promptManager.playSound(SoundType.Message);
            // promptManager.put()
        }
        if (!isOwn) {
            const groupVoicePromptSetting: VoicePromptGroupSetting = this.appContext.getMaterial(VoicePromptGroupSetting);

            const voicePromptType = groupVoicePromptSetting.getType(groupId);
            if (VoicePromptType.unread === voicePromptType) {
                if ((!isChatShowing || !isTabShowing) && !isOwn) {
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
