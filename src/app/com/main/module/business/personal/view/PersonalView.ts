import User from '@/app/com/main/module/business/user/bean/User';
import View from '@/app/com/client/common/view/View';

export default interface PersonalView extends View {

    setUser(user: User): void;
}
