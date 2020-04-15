import {MethodMapping} from '@/app/base/annotation/ActionDecorator';
import AbstractMaterial from '@/app/base/AbstractMaterial';
import ContactCategory from '@/app/com/bean/ContactCategory';
import ContactCategoryService from '@/app/com/main/service/ContactCategoryService';

export default class ContactCategoryAction extends AbstractMaterial {

    private static action: string = '1.2.002';

    /*********************************** back **********************************************/
    @MethodMapping(ContactCategoryAction, ContactCategoryAction.action, '1.1.0002')
    public setList(data: any): void {
        if (data && data.body) {
            const list: ContactCategory[] = data.body.items;
            if (list) {
                const ccs: ContactCategoryService = this.appContext.getMaterial(ContactCategoryService);
                ccs.setList(list);
            }
        }
    }

    /*********************************** push **********************************************/
    @MethodMapping(ContactCategoryAction, ContactCategoryAction.action, '1.2.0001')
    public add(data: any): void {
        if (data && data.body) {
            const categoryId: string = data.body.id;
            if (categoryId) {
                const ccs: ContactCategoryService = this.appContext.getMaterial(ContactCategoryService);
                ccs.addById(categoryId);
            }
        }
    }

    @MethodMapping(ContactCategoryAction, ContactCategoryAction.action, '1.2.0003')
    public updateName(data: any): void {
        if (data && data.body) {
            const categoryId: string = data.body.id;
            const name: string = data.body.name;
            if (categoryId) {
                const ccs: ContactCategoryService = this.appContext.getMaterial(ContactCategoryService);
                ccs.updateName(categoryId, name);
            }
        }
    }

    @MethodMapping(ContactCategoryAction, ContactCategoryAction.action, '1.2.0004')
    public updateRank(data: any): void {
        const ccs: ContactCategoryService = this.appContext.getMaterial(ContactCategoryService);
        ccs.updateRank();
    }

    @MethodMapping(ContactCategoryAction, ContactCategoryAction.action, '1.2.0005')
    public delete(data: any): void {
        if (data && data.body) {
            const categoryId: string = data.body.id;
            if (categoryId) {
                const ccs: ContactCategoryService = this.appContext.getMaterial(ContactCategoryService);
                ccs.delete(categoryId);
            }
        }
    }
}

