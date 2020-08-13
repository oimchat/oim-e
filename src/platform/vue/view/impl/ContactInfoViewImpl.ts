import ContactInfoView from '@/app/com/main/module/business/contact/view/ContactInfoView';
import User from '@/app/com/main/module/business/user/bean/User';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import mainViewData from '@/platform/web/view/data/MainViewData';
import mainBaseTabs from '@/platform/web/view/data/MainBaseTabs';
import contactInfoViewModel from '@/platform/vue/view/model/ContactInfoViewModel';
import app from '@/app/App';
import ContactRelationBox from '@/app/com/main/module/business/contact/box/ContactRelationBox';

export default class ContactInfoViewImpl extends AbstractMaterial implements ContactInfoView {

    public isVisible(): boolean {
        return mainViewData.tab === mainBaseTabs.contactTab.key;
    }

    public setUser(user: User): void {
        const userId = user.id;
        const contactListBox: ContactRelationBox = app.appContext.getMaterial(ContactRelationBox);
        let relation: any;
        const list = contactListBox.getContactInContactRelationListByUserId(userId);
        if (list && list.length > 0) {
            relation = list[0];
        }
        contactInfoViewModel.setUser(user);
        contactInfoViewModel.setRelation(relation);
    }

    public setVisible(visible: boolean): void {
        if (visible) {
            mainViewData.tab = mainBaseTabs.contactTab.key;
        }
    }
}
