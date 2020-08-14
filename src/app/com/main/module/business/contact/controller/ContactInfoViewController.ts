import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import ContactRelationBox from '@/app/com/main/module/business/contact/box/ContactRelationBox';
import UserAccess from '@/app/com/main/module/business/user/access/UserAccess';
import User from '@/app/com/main/module/business/user/bean/User';
import ContactInfoView from '@/app/com/main/module/business/contact/view/ContactInfoView';
import WorkViewEnum from '@/app/com/common/view/WorkViewEnum';

export default class ContactInfoViewController extends AbstractMaterial {

    public showById(id: string) {
        const view: ContactInfoView = this.appContext.getView(WorkViewEnum.ContactInfoView);
        const box: ContactRelationBox = this.appContext.getMaterial(ContactRelationBox);
        if (box.inMemberList(id)) {
            const userAccess: UserAccess = this.appContext.getMaterial(UserAccess);
            userAccess.getUserById(id, (success: boolean, message: string, user: User) => {
                if (success && user) {
                    view.setUser(user);
                    view.setVisible(true);
                }
            });
        }
    }
}
