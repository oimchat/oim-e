import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import DataChange from '@/app/base/event/DataChange';
import User from '@/app/com/main/module/business/user/bean/User';
import UserListener from '@/app/com/main/module/business/user/listener/UserListener';
import UserHandler from '@/app/com/main/module/business/user/handler/UserHandler';
import UserTempBox from "@/app/com/main/module/business/user/box/UserTempBox";

export default class UserAccess extends AbstractMaterial {

    public addChangeEvent(e: DataChange<User>) {
        const userListener: UserListener = this.appContext.getMaterial(UserListener);
        userListener.addChangeEvent(e);
    }

    public getUserById(userId: string, back: (success: boolean, user: User) => void): void {
        const userHandler: UserHandler = this.appContext.getMaterial(UserHandler);
        userHandler.getUserById(userId, back);
    }

    public getTempUserById(userId: string, back: (success: boolean, user: User) => void): void {
        const userHandler: UserHandler = this.appContext.getMaterial(UserHandler);
        const userTempBox: UserTempBox = this.appContext.getMaterial(UserTempBox);
        const user: User = userTempBox.getUser(userId);
        if (user) {
            back(true, user);
        } else {
            userHandler.getUserFromServerById(userId, (success, user) => {
                if (success && user) {
                    userTempBox.keepSize(10000);
                    userTempBox.putUser(user);
                }
                back(success, user);
            });
        }
    }
}
