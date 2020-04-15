import AbstractMaterial from '@/app/base/AbstractMaterial';
import User from '@/app/com/bean/User';
import UserBox from '@/app/com/main/box/UserBox';
import ViewEnum from '@/app/com/main/view/ViewEnum';
import UserChatView from '@/app/com/main/view/UserChatView';
import MessageAreaView from '@/app/com/main/view/MessageAreaView';
import UserChatManager from '@/app/com/main/manager/UserChatManager';
import Content from '@/app/com/data/chat/content/Content';
import PersonalBox from '@/app/com/main/box/PersonalBox';
import DataBackAction from '@/app/base/net/DataBackAction';
import UserSender from '@/app/com/main/sender/UserSender';
import UserChatService from '@/app/com/main/service/UserChatService';
import AbstractDataBackAction from '@/app/base/net/AbstractDataBackAction';
import LastChatUser from '@/app/com/data/chat/LastChatUser';
import UserChatInfoService from '@/app/com/main/service/UserChatInfoService';
import UserChatItemService from '@/app/com/main/service/UserChatItemService';
import UserChatSender from '@/app/com/main/sender/UserChatSender';
import UserChatItemManager from '@/app/com/main/manager/UserChatItemManager';
import UserChatInfoManager from '@/app/com/main/manager/UserChatInfoManager';
import UserChatItemEvent from '@/app/com/main/function/UserChatItemEvent';
import CoreContentUtil from '@/app/com/main/util/CoreContentUtil';


export default class UserLastChatService extends AbstractMaterial {

    public loadLastChatWithContentList(count: number) {

        const own = this;
        const userChatSender: UserChatSender = this.appContext.getMaterial(UserChatSender);

        const dataBack: DataBackAction = {
            back(data: any): void {
                if (data && data.body) {
                    const list = data.body.items;
                    own.setLastChatUserList(list);
                }
            },
            timeOut(data: any): void {
                // no
            },
            lost(data: any): void {
                // no
            },
        } as AbstractDataBackAction;

        userChatSender.getLastChatWithContentList(10, dataBack);
    }

    private setLastChatUserList(list: LastChatUser[]) {
        if (list) {
            const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);
            const ownUserId = pb.getUserId();
            const isReceive = true;

            const userChatInfoManager: UserChatInfoManager = this.appContext.getMaterial(UserChatInfoManager);
            const userChatItemManager: UserChatItemManager = this.appContext.getMaterial(UserChatItemManager);
            const userBox: UserBox = this.appContext.getMaterial(UserBox);

            for (const data of list) {
                const messageKey: string = data.messageKey;
                const contentId: string = data.contentId;
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
