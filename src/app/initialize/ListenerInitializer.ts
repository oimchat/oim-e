import LaunchInitializer from '@/app/base/initialize/LaunchInitializer';
import AppContext from '@/app/base/context/AppContext';
import DataChange from '@/app/base/event/DataChange';
import User from '@/app/com/main/module/business/user/bean/User';
import UserAccess from '@/app/com/main/module/business/user/access/UserAccess';
import GroupMemberUserBox from '@/app/com/main/module/business/group/box/GroupMemberUserBox';

export default class ListenerInitializer extends LaunchInitializer {

    public getOrder(): number {
        return 0;
    }

    public initialize(): void {
        this.initializeHandle(this.appContext);
    }

    public getKey(): string {
        const own: object = this;
        return own.constructor.name;
    }

    public initializeHandle(appContext: AppContext) {
        // no
        const userChange: DataChange<User> = {
            change(user: User) {
                const groupMemberUserBox: GroupMemberUserBox = appContext.getMaterial(GroupMemberUserBox);
                groupMemberUserBox.updateUser(user);
            },
        } as DataChange<User>;
        const userAccess: UserAccess = appContext.getMaterial(UserAccess);
        userAccess.addChangeEvent(userChange);
    }
}
