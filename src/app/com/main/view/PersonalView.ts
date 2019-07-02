import User from '@/app/com/bean/User';
import View from '@/app/com/main/view/View';

export default interface PersonalView extends View {

    setUser(user: User): void;
}
