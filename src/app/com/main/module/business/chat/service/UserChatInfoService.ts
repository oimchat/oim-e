import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import User from '@/app/com/main/module/business/user/bean/User';
import UserChatInfoManager from '@/app/com/main/module/business/chat/manager/UserChatInfoManager';
import UserChatManager from '@/app/com/main/module/business/chat/manager/UserChatManager';
import UserChatOpenManager from '@/app/com/main/module/business/chat/manager/UserChatOpenManager';
import Prompter from '@/app/com/client/component/Prompter';
import UserAccess from '@/app/com/main/module/business/user/access/UserAccess';


export default class UserChatInfoService extends AbstractMaterial {

    public showChatByInfo(user: User) {
        if (user) {
            const userId = user.id;
            const userChatInfoManager: UserChatInfoManager = this.appContext.getMaterial(UserChatInfoManager);
            const userChatOpenManager: UserChatOpenManager = this.appContext.getMaterial(UserChatOpenManager);
            const userChatManager: UserChatManager = this.appContext.getMaterial(UserChatManager);

            userChatInfoManager.showUserChat(user);
            userChatOpenManager.openUserChatById(userId);
            userChatManager.firstLoadHistory(userId, '', 10);
        }
    }

    public showUserChatById(userId: string) {
        const own = this;
        const prompter: Prompter = this.appContext.getMaterial(Prompter);
        const userAccess: UserAccess = this.appContext.getMaterial(UserAccess);
        userAccess.getUserById(userId, (success, message: string, user) => {
            if (success) {
                own.showChatByInfo(user);
            } else {
                prompter.warn('加载用户失败');
            }
        });
    }
}
