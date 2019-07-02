import AbstractMaterial from '@/app/base/AbstractMaterial';
import ContactCategory from '@/app/com/bean/ContactCategory';
import DataBackAction from '@/app/base/net/DataBackAction';
import PersonalBox from '@/app/com/main/box/PersonalBox';
import ContactCategorySender from '@/app/com/main/sender/ContactCategorySender';

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

    public updateRank(categoryId: string, rank: number, back?: DataBackAction, parallel?: boolean): void {
        const contactCategorySender: ContactCategorySender = this.appContext.getMaterial(ContactCategorySender);
        contactCategorySender.updateRank(categoryId, rank, back, parallel);
    }

    public delete(categoryId: string, back?: DataBackAction, parallel?: boolean): void {
        const contactCategorySender: ContactCategorySender = this.appContext.getMaterial(ContactCategorySender);
        contactCategorySender.delete(categoryId, back, parallel);
    }
}
