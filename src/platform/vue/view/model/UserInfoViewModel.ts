import BaseUserInfoViewModel from '@/platform/vue/view/model/BaseUserInfoViewModel';
import ContactRelation from '@/app/com/main/module/business/contact/bean/ContactRelation';

class UserInfoViewModel extends BaseUserInfoViewModel {

    public relation: ContactRelation = new ContactRelation();
    public isContact: boolean = false;

    public setRelation(relation: ContactRelation) {
        if (relation) {
            this.relation = relation;
            this.isContact = true;
        } else {
            this.relation = new ContactRelation();
            this.isContact = false;
        }
    }
}

export default new UserInfoViewModel();
