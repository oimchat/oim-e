import View from '@/app/com/client/common/view/View';
import User from '@/app/com/main/module/business/user/bean/User';

export default interface UserInfoView extends View {

    setUser(user: User): void;
}
