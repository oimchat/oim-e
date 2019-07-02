import AbstractMaterial from '@/app/base/AbstractMaterial';
import User from '@/app/com/bean/User';
import BaseUtil from '@/app/lib/util/BaseUtil';
import UserInfoUtil from '@/app/com/main/util/UserInfoUtil';
import ContactCategory from '@/app/com/bean/ContactCategory';
import ContactRelation from '@/app/com/bean/ContactRelation';

export default class ContactListBox extends AbstractMaterial {


    /*** 所有分组*/
    private allCategoryMap: Map<string, ContactCategory> = new Map<string, ContactCategory>();
    /*** 分组中的成员列表<categoryId,Map<userId, ContactRelation>>*/
    private categoryMemberListMap: Map<string, Map<string, ContactRelation>> = new Map<string, Map<string, ContactRelation>>();
    /*** 用户所在的分组<userId,Map<categoryId, ContactRelation>>*/
    private contactInCategoryMap: Map<string, Map<string, ContactRelation>> = new Map<string, Map<string, ContactRelation>>();


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
            if (data.sort === ContactCategory.SORT_DEFAULT) {
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


    public putContactRelation(relation: ContactRelation): void {
        const contactUserId = relation.contactUserId;
        const categoryId = relation.categoryId;

        const categoryMemberMap = this.getCategoryMemberMap(categoryId);
        categoryMemberMap.set(contactUserId, relation);

        const inCategoryMemberMap = this.getContactInCategoryMemberMapByUserId(contactUserId);
        inCategoryMemberMap.set(categoryId, relation);
    }

    public putContactRelationList(list: ContactRelation[]) {
        if (list) {
            for (const relation of list) {
                this.putContactRelation(relation);
            }
        }
    }


    public removeContactRelationList(userId: string) {
        const map: any = this.contactInCategoryMap.get(userId);
        this.contactInCategoryMap.delete(userId);
        const list: ContactRelation[] = [];
        if (!BaseUtil.isEmpty(map)) {
            const values = (map.values());
            for (const data of values) {
                list.push(data);
            }
            const length = list.length;
            for (let i = 0; i < length; i++) {
                const relation = list[i];
                if (relation) {
                    const categoryId = relation.categoryId;
                    const categoryMemberMap = this.getCategoryMemberMap(categoryId);
                    categoryMemberMap.delete(userId);
                }
            }
        }
        return list;
    }

    public removeContactRelationListByCategoryId(categoryId: string): ContactRelation[] {
        const list: ContactRelation[] = [];
        const map = this.categoryMemberListMap.get(categoryId);
        if (map) {
            this.categoryMemberListMap.delete(categoryId);
            const values = map.values();
            for (const data of values) {
                list.push(data);
            }
        }
        return list;
    }

    public removeContactRelation(categoryId: string, userId: string) {
        const categoryMemberMap = this.getCategoryMemberMap(categoryId);
        const relation = categoryMemberMap.get(userId);
        categoryMemberMap.delete(userId);
        const map = this.contactInCategoryMap.get(userId);
        if (map) {
            map.delete(categoryId);
            if (map.size === 0) {
                this.contactInCategoryMap.delete(userId);
            }
        }
        return relation;
    }

    public getContactRelationList(categoryId: string): ContactRelation[] {
        const categoryMemberMap = this.getCategoryMemberMap(categoryId);
        const list: ContactRelation[] = [];
        const values = categoryMemberMap.values();
        for (const data of values) {
            list.push(data);
        }
        return list;
    }

    public getContactRelationSize(categoryId: string): number {
        const categoryMemberList: any = this.categoryMemberListMap.get(categoryId);
        return BaseUtil.isEmpty(categoryMemberList) ? 0 : categoryMemberList.size;
    }

    public getContactInContactRelationListByUserId(userId: string): ContactRelation[] {
        const map = this.getContactInCategoryMemberMapByUserId(userId);
        const list: ContactRelation[] = [];
        const values = map.values();
        for (const data of values) {
            list.push(data);
        }
        return list;
    }

    public getContactRelationByUserId(userId: string): ContactRelation {
        let relation: any;
        const map = this.getContactInCategoryMemberMapByUserId(userId);
        const list: ContactRelation[] = [];
        const values = map.values();
        for (const data of values) {
            list.push(data);
        }
        if (list.length > 0) {
            relation = list[0];
        }
        return relation;
    }

    public clearContactRelation(): void {
        this.categoryMemberListMap.clear();
        this.contactInCategoryMap.clear();
    }

    public getCategoryMemberMap(categoryId: string): Map<string, ContactRelation> {
        let map = this.categoryMemberListMap.get(categoryId);
        if (!map) {
            map = new Map<string, ContactRelation>();
            this.categoryMemberListMap.set(categoryId, map);
        }
        return map;
    }

    public getContactInCategoryMemberMapByUserId(userId: string): Map<string, ContactRelation> {
        let map = this.contactInCategoryMap.get(userId);
        if (!map) {
            map = new Map<string, ContactRelation>();
            this.contactInCategoryMap.set(userId, map);
        }
        return map;
    }

    /**
     * 是否在好友列表
     *
     * @author: XiaHui
     * @param userId
     */
    public inMemberList(userId: string): boolean {
        const has = this.contactInCategoryMap.has(userId);
        return has;
    }
}
