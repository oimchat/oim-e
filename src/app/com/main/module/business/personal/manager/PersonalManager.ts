import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import User from '@/app/com/main/module/business/user/bean/User';
import PersonalBox from '@/app/com/main/module/business/personal/box/PersonalBox';
import PersonalView from '@/app/com/main/module/business/personal/view/PersonalView';
import WorkViewEnum from '@/app/com/common/view/WorkViewEnum';
import UserInfoUtil from '@/app/com/main/common/util/UserInfoUtil';

export default class PersonalManager extends AbstractMaterial {

    public setUser(user: User): void {
        UserInfoUtil.handleAvatar(user);

        const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);
        pb.setUser(user);

        const pv: PersonalView = this.appContext.getView(WorkViewEnum.PersonalView);
        pv.setUser(user);
    }

    public updateStatus(status: string) {
        const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);
        const user = pb.getUser();
        user.status = status;
        const pv: PersonalView = this.appContext.getView(WorkViewEnum.PersonalView);
        pv.setUser(user);
    }
}
