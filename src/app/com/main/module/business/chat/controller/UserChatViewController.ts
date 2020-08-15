import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import User from '@/app/com/main/module/business/user/bean/User';
import UserChatInfoService from '@/app/com/main/module/business/chat/service/UserChatInfoService';
import UserChatItemService from '@/app/com/main/module/business/chat/service/UserChatItemService';
import Prompter from '@/app/com/client/component/Prompter';
import UserAccess from '@/app/com/main/module/business/user/access/UserAccess';

export default class UserChatViewController extends AbstractMaterial {

    public showUserChatById(userId: string) {
        const own = this;
        const prompter: Prompter = this.appContext.getMaterial(Prompter);
        const userAccess: UserAccess = this.appContext.getMaterial(UserAccess);
        userAccess.getUserById(userId, (success, message: string, user) => {
            if (success) {
                own.showUserChatByInfo(user);
            } else {
                prompter.warn('加载用户失败');
            }
        });
    }

    public showUserChatByInfo(user: User) {
        const userChatItemService: UserChatItemService = this.appContext.getMaterial(UserChatItemService);
        const userChatInfoService: UserChatInfoService = this.appContext.getMaterial(UserChatInfoService);
        userChatItemService.showUserChatItem(user);
        userChatInfoService.showChatByInfo(user);
    }
}
