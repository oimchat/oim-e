import PersonalView from '@/app/com/main/module/business/personal/view/PersonalView';
import User from '@/app/com/main/module/business/user/bean/User';
import personalDataBox from '@/platform/vue/view/model/PersonalViewModel';
import UserInfoUtil from '@/app/com/main/common/util/UserInfoUtil';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';

export default class PersonalViewImpl extends AbstractMaterial implements PersonalView {
    public setUser(user: User): void {
        const key: string = user.id;
        const name = UserInfoUtil.getShowName(user);
        const avatar = UserInfoUtil.getHeadImage(user);
        personalDataBox.personalData.key = key;
        personalDataBox.personalData.name = name;
        personalDataBox.personalData.avatar = avatar;
        personalDataBox.personalData.text = user.signature;
    }
}
