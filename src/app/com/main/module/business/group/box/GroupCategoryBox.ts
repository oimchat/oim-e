import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import GroupCategory from '@/app/com/main/module/business/group/bean/GroupCategory';


export default class GroupCategoryBox extends AbstractMaterial {
    /*** 所有分组*/
    private allCategoryMap: Map<string, GroupCategory> = new Map<string, GroupCategory>();

    public putCategoryList(list: GroupCategory[]): void {
        if (list) {
            for (const category of list) {
                this.putCategory(category);
            }
        }
    }

    public putCategory(category: GroupCategory): void {
        const id = category.id;
        this.allCategoryMap.set(id, category);
    }

    public getCategoryList(): GroupCategory[] {
        const values = this.allCategoryMap.values();
        const list: GroupCategory[] = [];
        for (const category of values) {
            list.push(category);
        }
        return list;
    }

    public hasCategory(categoryId: string): boolean {
        return this.allCategoryMap.has(categoryId);
    }

    public getCategory(categoryId: string): GroupCategory {
        const category: GroupCategory | any = this.allCategoryMap.get(categoryId);
        return category;
    }

    public getDefaultCategory(): GroupCategory {
        let category: any;
        const list: GroupCategory[] = this.getCategoryList();
        for (const data of list) {
            if (data.type === GroupCategory.TYPE_DEFAULT) {
                category = data;
                break;
            }
        }
        return category;
    }

    public getDefaultCategoryId(): string {
        let id: string = '';
        const category: GroupCategory = this.getDefaultCategory();
        if (category) {
            id = category.id;
        }
        return id;
    }

    public removeCategory(categoryId: string): GroupCategory {
        const category: GroupCategory | any = this.allCategoryMap.get(categoryId);
        this.allCategoryMap.delete(categoryId);
        return category;
    }


    public clearCategory(): void {
        this.allCategoryMap.clear();
    }
}
