import AbstractMaterial from '@/app/base/AbstractMaterial';
import User from '@/app/com/bean/User';
import PersonalBox from '@/app/com/main/box/PersonalBox';
import PersonalView from '@/app/com/main/view/PersonalView';
import ViewEnum from '@/app/com/main/view/ViewEnum';
import UserInfoUtil from '@/app/com/main/util/UserInfoUtil';

export default class PersonalManager extends AbstractMaterial {

    public setUser(user: User): void {
        UserInfoUtil.handleAvatar(user);

        const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);
        pb.setUser(user);

        const pv: PersonalView = this.appContext.getView(ViewEnum.PersonalView);
        pv.setUser(user);
    }

    public updateStatus(status: string) {
        const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);
        const user = pb.getUser();
        user.status = status;
        const pv: PersonalView = this.appContext.getView(ViewEnum.PersonalView);
        pv.setUser(user);
    }
}
