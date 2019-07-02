import AbstractMaterial from '@/app/base/AbstractMaterial';
import User from '@/app/com/bean/User';
import UserBox from '@/app/com/main/box/UserBox';
import ViewEnum from '@/app/com/main/view/ViewEnum';
import UserChatView from '@/app/com/main/view/UserChatView';
import MessageAreaView from '@/app/com/main/view/MessageAreaView';


export default class UserChatInfoManager extends AbstractMaterial {

    private chatType = 'user_chat';

    public showUserChatById(userId: string) {
        const userBox: UserBox = this.appContext.getMaterial(UserBox);
        const user: User = userBox.getUser(userId);
        if (user) {
            this.showUserChat(user);
        }
    }

    public showUserChat(user: User) {
        const messageAreaView: MessageAreaView = this.appContext.getView(ViewEnum.MessageAreaView);
        messageAreaView.showType(this.chatType);

        const userChatView: UserChatView = this.appContext.getView(ViewEnum.UserChatView);
        userChatView.setUser(user);
    }

    public isChatShowing(userId: string): boolean {
        let showing = false;
        const userChatView: UserChatView = this.appContext.getView(ViewEnum.UserChatView);
        const messageAreaView: MessageAreaView = this.appContext.getView(ViewEnum.MessageAreaView);
        showing = (messageAreaView.getType() === this.chatType && userChatView.isShowing(userId));
        return showing;
    }
}
