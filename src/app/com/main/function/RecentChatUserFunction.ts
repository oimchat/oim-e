import AbstractMaterial from '@/app/base/AbstractMaterial';
import User from '@/app/com/bean/User';
import UserBox from '@/app/com/main/box/UserBox';
import Content from '@/app/com/data/chat/content/Content';
import PersonalBox from '@/app/com/main/box/PersonalBox';
import UserChatItemManager from '@/app/com/main/manager/UserChatItemManager';
import UserChatInfoManager from '@/app/com/main/manager/UserChatInfoManager';
import CoreContentUtil from '@/app/com/main/util/CoreContentUtil';
import UserChatData from '@/app/com/data/chat/UserChatData';


export default class RecentChatUserFunction extends AbstractMaterial {


    public setRecentChatList(list: UserChatData[]) {
        if (list) {
            const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);
            const ownUserId = pb.getUserId();
            const isReceive = true;

            const userChatInfoManager: UserChatInfoManager = this.appContext.getMaterial(UserChatInfoManager);
            const userChatItemManager: UserChatItemManager = this.appContext.getMaterial(UserChatItemManager);
            const userBox: UserBox = this.appContext.getMaterial(UserBox);

            for (const data of list) {
                // const messageKey: string = data.messageKey;
                // const contentId: string = data.contentId;
                const content: Content = data.content;
                const receiveUser: User = data.receiveUser;
                const sendUser: User = data.sendUser;

                const sendUserId: string = sendUser.id;
                const receiveUserId: string = receiveUser.id;

                const isOwn: boolean = sendUserId === ownUserId;

                let showUser: User = (isOwn) ? receiveUser : sendUser;
                const chatUser: User = (isOwn) ? sendUser : showUser;

                const key = showUser.id;
                const user: User = userBox.getUser(key);

                showUser = (user) ? user : showUser;

                userChatItemManager.addOrUpdate(showUser);

                const showTime = CoreContentUtil.getChatShowTime(content.timestamp);
                const text = CoreContentUtil.getText(content);
                userChatItemManager.updateItemText(key, text, showTime);
            }
        }
    }
}
