import User from '@/app/com/main/module/business/user/bean/User';
import VisibleView from '@/app/com/client/common/view/VisibleView';

export default interface ContactInfoView extends VisibleView {

    setUser(user: User): void;
}
