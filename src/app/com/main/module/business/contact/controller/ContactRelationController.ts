import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import ContactRelationSender from '@/app/com/main/module/business/contact/sender/ContactRelationSender';

export default class ContactRelationController extends AbstractMaterial {


    public getRelation(contactUserId: string, back?: DataBackAction, parallel?: boolean): void {
        const contactRelationSender: ContactRelationSender = this.appContext.getMaterial(ContactRelationSender);
        contactRelationSender.getRelation(contactUserId, back, parallel);
    }

    public updateRemark(contactUserId: string, remark: string, back?: DataBackAction, parallel?: boolean): void {
        const contactRelationSender: ContactRelationSender = this.appContext.getMaterial(ContactRelationSender);
        contactRelationSender.updateRemark(contactUserId, remark, back, parallel);
    }

    public moveCategory(contactUserIds: string[], categoryId: string, back?: DataBackAction, parallel?: boolean): void {
        const contactRelationSender: ContactRelationSender = this.appContext.getMaterial(ContactRelationSender);
        contactRelationSender.moveCategory(contactUserIds, categoryId, back, parallel);
    }

    public delete(contactUserId: string, back?: DataBackAction, parallel?: boolean): void {
        const contactRelationSender: ContactRelationSender = this.appContext.getMaterial(ContactRelationSender);
        contactRelationSender.delete(contactUserId, back, parallel);
    }

    public updateBlocked(contactUserId: string, isBlocked: string, back?: DataBackAction, parallel?: boolean): void {
        const contactRelationSender: ContactRelationSender = this.appContext.getMaterial(ContactRelationSender);
        contactRelationSender.updateBlocked(contactUserId, isBlocked, back, parallel);
    }
}
