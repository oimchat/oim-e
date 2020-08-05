import View from '@/app/com/main/view/View';
import User from '@/app/com/bean/User';

export default interface UserInfoView extends View {

    setUser(user: User): void;
}
