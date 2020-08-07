import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import ContactCategory from '@/app/com/main/module/business/contact/bean/ContactCategory';
import DataBackAction from '@/app/base/net/DataBackAction';
import PersonalBox from '@/app/com/main/module/business/personal/box/PersonalBox';
import ContactCategorySender from '@/app/com/main/module/business/contact/sender/ContactCategorySender';

export default class ContactCategoryController extends AbstractMaterial {
    public addCategory(name: string, back?: DataBackAction): void {
        const personalBox: PersonalBox = this.appContext.getMaterial(PersonalBox);
        const category: ContactCategory = new ContactCategory();
        category.name = name;
        category.userId = personalBox.getUserId();
        const contactCategorySender: ContactCategorySender = this.appContext.getMaterial(ContactCategorySender);
        contactCategorySender.addCategory(category, back);
    }

    public updateName(categoryId: string, name: string, back?: DataBackAction, parallel?: boolean): void {
        const contactCategorySender: ContactCategorySender = this.appContext.getMaterial(ContactCategorySender);
        contactCategorySender.updateName(categoryId, name, back, parallel);
    }

    public updateSort(categoryId: string, sort: number, back?: DataBackAction, parallel?: boolean): void {
        const contactCategorySender: ContactCategorySender = this.appContext.getMaterial(ContactCategorySender);
        contactCategorySender.updateSort(categoryId, sort, back, parallel);
    }

    public delete(categoryId: string, back?: DataBackAction, parallel?: boolean): void {
        const contactCategorySender: ContactCategorySender = this.appContext.getMaterial(ContactCategorySender);
        contactCategorySender.delete(categoryId, back, parallel);
    }
}
