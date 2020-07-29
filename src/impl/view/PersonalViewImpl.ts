import PersonalView from '@/app/com/main/view/PersonalView';
import User from '@/app/com/bean/User';
import personalDataBox from '@/impl/PersonalDataBox';
import UserInfoUtil from '@/app/com/main/util/UserInfoUtil';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';

export default class PersonalViewImpl extends AbstractMaterial implements PersonalView {
    public setUser(user: User): void {
        const key: string = user.id;
        const name = UserInfoUtil.getShowName(user);
        const avatar = UserInfoUtil.getHeadImage(user);
        personalDataBox.personalData.key = key;
        personalDataBox.personalData.name = name;
        personalDataBox.personalData.avatar = avatar;
    }
}
