import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import ContactCategory from '@/app/com/main/module/business/contact/bean/ContactCategory';

export default class ContactCategoryBox extends AbstractMaterial {

    /*** 所有分组*/
    private allCategoryMap: Map<string, ContactCategory> = new Map<string, ContactCategory>();

    public putCategoryList(list: ContactCategory[]): void {
        if (list) {
            for (const category of list) {
                this.putCategory(category);
            }
        }
    }

    public putCategory(category: ContactCategory): void {
        const id = category.id;
        this.allCategoryMap.set(id, category);
    }

    public getCategoryList(): ContactCategory[] {
        const values = this.allCategoryMap.values();
        const list: ContactCategory[] = [];
        for (const category of values) {
            list.push(category);
        }
        return list;
    }

    public hasCategory(categoryId: string): boolean {
        return this.allCategoryMap.has(categoryId);
    }

    public getCategory(categoryId: string): ContactCategory {
        const category: ContactCategory | any = this.allCategoryMap.get(categoryId);
        return category;
    }

    public getDefaultCategory(): ContactCategory {
        let category: any;
        const list: ContactCategory[] = this.getCategoryList();
        for (const data of list) {
            if (data.type === ContactCategory.TYPE_DEFAULT) {
                category = data;
                break;
            }
        }
        return category;
    }

    public getDefaultCategoryId(): string {
        let id: string = '';
        const category: ContactCategory = this.getDefaultCategory();
        if (category) {
            id = category.id;
        }
        return id;
    }

    public removeCategory(categoryId: string): ContactCategory {
        const category: ContactCategory | any = this.allCategoryMap.get(categoryId);
        this.allCategoryMap.delete(categoryId);
        return category;
    }


    public clearCategory(): void {
        this.allCategoryMap.clear();
    }
}
