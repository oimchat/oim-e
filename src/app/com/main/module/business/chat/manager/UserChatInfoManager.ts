import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import User from '@/app/com/main/module/business/user/bean/User';
import WorkViewEnum from '@/app/com/common/view/WorkViewEnum';
import UserChatView from '@/app/com/main/module/business/chat/view/UserChatView';
import Prompter from '@/app/com/client/component/Prompter';
import UserAccess from '@/app/com/main/module/business/user/access/UserAccess';

export default class UserChatInfoManager extends AbstractMaterial {

    public showUserChatById(userId: string) {
        const own = this;
        const prompter: Prompter = this.appContext.getMaterial(Prompter);
        const userAccess: UserAccess = this.appContext.getMaterial(UserAccess);
        userAccess.getUserById(userId, (success, message: string, user) => {
            if (success) {
                own.showUserChat(user);
            } else {
                prompter.warn('加载用户失败');
            }
        });
    }

    public showUserChat(user: User) {
        const userChatView: UserChatView = this.appContext.getView(WorkViewEnum.UserChatView);
        userChatView.setUser(user);
        userChatView.setVisible(true);
    }

    public isChatShowing(userId: string): boolean {
        let showing = false;
        const userChatView: UserChatView = this.appContext.getView(WorkViewEnum.UserChatView);
        showing = (userChatView.isVisible() && userChatView.isShowing(userId));
        return showing;
    }

    public updateInfo(user: User) {
        const userChatView: UserChatView = this.appContext.getView(WorkViewEnum.UserChatView);
        userChatView.setUser(user);
    }
}
