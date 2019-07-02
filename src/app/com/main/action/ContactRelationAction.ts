import {MethodMapping} from '@/app/base/annotation/ActionDecorator';
import AbstractMaterial from '@/app/base/AbstractMaterial';
import ContactRelationService from '@/app/com/main/service/ContactRelationService';
import ContactRelation from '@/app/com/bean/ContactRelation';
import ContactService from '@/app/com/main/service/ContactService';

export default class ContactRelationAction extends AbstractMaterial {

    private static action: string = '1.2.103';

    @MethodMapping(ContactRelationAction, ContactRelationAction.action, '1.1.0002')
    public setList(data: any): void {
        if (data && data.body) {
            const list: ContactRelation[] = data.body.list;
            if (list) {
                const ccs: ContactRelationService = this.appContext.getMaterial(ContactRelationService);
                ccs.setList(list);
            }
        }
    }


    @MethodMapping(ContactRelationAction, ContactRelationAction.action, '1.2.0001')
    public add(data: any): void {
        if (data && data.body) {
            const contactUserId: string = data.body.contactUserId;
            if (contactUserId) {
                const ccs: ContactRelationService = this.appContext.getMaterial(ContactRelationService);
                ccs.addByContactUserId(contactUserId);
                const contactService: ContactService = this.appContext.getMaterial(ContactService);
                contactService.addByUserId(contactUserId);
            }
        }
    }

    @MethodMapping(ContactRelationAction, ContactRelationAction.action, '1.2.0002')
    public updateRemark(data: any): void {
        if (data && data.body) {
            const contactUserId: string = data.body.contactUserId;
            const remark: string = data.body.remark;
            if (contactUserId) {
                const ccs: ContactRelationService = this.appContext.getMaterial(ContactRelationService);
                ccs.updateRemark(contactUserId, remark);
            }
        }
    }

    @MethodMapping(ContactRelationAction, ContactRelationAction.action, '1.2.0003')
    public moveCategory(data: any): void {
        if (data && data.body) {
            const contactUserIds: string[] = data.body.contactUserIds;
            const categoryId: string = data.body.categoryId;
            if (contactUserIds) {
                const ccs: ContactRelationService = this.appContext.getMaterial(ContactRelationService);
                ccs.moveCategory(contactUserIds, categoryId);
            }
        }
    }

    @MethodMapping(ContactRelationAction, ContactRelationAction.action, '1.2.0004')
    public delete(data: any): void {
        if (data && data.body) {
            const contactUserId: string = data.body.contactUserId;
            if (contactUserId) {
                const ccs: ContactRelationService = this.appContext.getMaterial(ContactRelationService);
                ccs.delete(contactUserId);
            }
        }
    }
}
