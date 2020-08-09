import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import User from '@/app/com/main/module/business/user/bean/User';
import UserBox from '@/app/com/main/module/business/user/box/UserBox';
import ViewEnum from '@/app/com/client/common/view/ViewEnum';
import UserChatView from '@/app/com/main/module/business/chat/view/UserChatView';

export default class UserChatInfoManager extends AbstractMaterial {

    public showUserChatById(userId: string) {
        const userBox: UserBox = this.appContext.getMaterial(UserBox);
        const user: User = userBox.getUser(userId);
        if (user) {
            this.showUserChat(user);
        }
    }

    public showUserChat(user: User) {
        const userChatView: UserChatView = this.appContext.getView(ViewEnum.UserChatView);
        userChatView.setUser(user);
        userChatView.setVisible(true);
    }

    public isChatShowing(userId: string): boolean {
        let showing = false;
        const userChatView: UserChatView = this.appContext.getView(ViewEnum.UserChatView);
        showing = (userChatView.isVisible() && userChatView.isShowing(userId));
        return showing;
    }
}
