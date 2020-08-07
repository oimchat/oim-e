import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import ContactCategory from '@/app/com/main/module/business/contact/bean/ContactCategory';
import ContactListManager from '@/app/com/main/module/business/contact/manager/ContactListManager';
import ContactCategorySender from '@/app/com/main/module/business/contact/sender/ContactCategorySender';
import DataBackAction from '@/app/base/net/DataBackAction';
import AbstractDataBackAction from '@/app/base/net/AbstractDataBackAction';
import ContactCategoryHandler from '@/app/com/main/module/business/contact/handler/ContactCategoryHandler';

export default class ContactCategoryService extends AbstractMaterial {

    public setList(list: ContactCategory[]): void {
        if (list) {
            const ccm: ContactListManager = this.appContext.getMaterial(ContactListManager);
            ccm.setCategoryList(list);
        }
    }

    public addById(categoryId: string) {
        const own = this;
        if (categoryId) {
            const back: DataBackAction = {
                back(data: any): void {
                    if (data && data.body) {
                        const category: ContactCategory = data.body;
                        if (category) {
                            own.add(category);
                        }
                    }
                },
            } as AbstractDataBackAction;
            const contactCategorySender: ContactCategorySender = this.appContext.getMaterial(ContactCategorySender);
            contactCategorySender.getCategory(categoryId, back);
        }
    }

    public add(category: ContactCategory): void {
        if (category) {
            const ccm: ContactListManager = this.appContext.getMaterial(ContactListManager);
            ccm.addOrUpdateCategory(category);
        }
    }

    public updateName(categoryId: string, name: string) {
        if (categoryId) {
            const ccm: ContactListManager = this.appContext.getMaterial(ContactListManager);
            ccm.updateCategoryName(categoryId, name);
        }
    }

    public updateSort() {
        const handler: ContactCategoryHandler = this.appContext.getMaterial(ContactCategoryHandler);
        handler.loadAllList();
    }

    public delete(categoryId: string) {
        const ccm: ContactListManager = this.appContext.getMaterial(ContactListManager);
        ccm.deleteCategory(categoryId);
    }
}
