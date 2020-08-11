import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import ContactRelationBox from '@/app/com/main/module/business/contact/box/ContactRelationBox';

export default class ContactAccess extends AbstractMaterial {

    public isContact(userId: string): boolean {
        const box: ContactRelationBox = this.appContext.getMaterial(ContactRelationBox);
        return box.inMemberList(userId);
    }
}
