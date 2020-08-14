import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import DataChange from '@/app/base/event/DataChange';
import User from '@/app/com/main/module/business/user/bean/User';
import UserListener from '@/app/com/main/module/business/user/listener/UserListener';
import UserHandler from '@/app/com/main/module/business/user/handler/UserHandler';

export default class UserAccess extends AbstractMaterial {

    public addChangeEvent(e: DataChange<User>) {
        const userListener: UserListener = this.appContext.getMaterial(UserListener);
        userListener.addChangeEvent(e);
    }


    public getUserById(userId: string, back: (success: boolean, message: string, user: User) => void): void {
        const userHandler: UserHandler = this.appContext.getMaterial(UserHandler);
        userHandler.getUserById(userId, back);
    }


    public getUsersByIds(ids: string[], back: (success: boolean, message: string, users: User[]) => void) {
        const userHandler: UserHandler = this.appContext.getMaterial(UserHandler);
        userHandler.getRemoteUsersByIds(ids, back);
    }
}
