import AbstractMaterial from '@/app/base/AbstractMaterial';
import BaseUtil from '@/app/lib/util/BaseUtil';
import GroupCategory from '@/app/com/bean/GroupCategory';
import GroupRelation from '@/app/com/bean/GroupRelation';

export default class GroupListBox extends AbstractMaterial {
    /*** 所有分组*/
    private allCategoryMap: Map<string, GroupCategory> = new Map<string, GroupCategory>();
    /*** 分组中的成员列表<categoryId,Map<groupId, GroupRelation>>*/
    private categoryMemberListMap: Map<string, Map<string, GroupRelation>> = new Map<string, Map<string, GroupRelation>>();
    /*** 用户所在的分组<groupId,Map<categoryId, GroupRelation>>*/
    private groupInCategoryMap: Map<string, Map<string, GroupRelation>> = new Map<string, Map<string, GroupRelation>>();


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
            if (data.sort === GroupCategory.SORT_DEFAULT) {
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


    public putGroupRelation(relation: GroupRelation): void {
        const groupId = relation.groupId;
        const categoryId = relation.categoryId;

        const categoryMemberMap = this.getCategoryMemberMap(categoryId);
        categoryMemberMap.set(groupId, relation);

        const inCategoryMemberMap = this.getGroupInCategoryMemberMapByGroupId(groupId);
        inCategoryMemberMap.set(categoryId, relation);
    }

    public putGroupRelationList(list: GroupRelation[]) {
        if (list) {
            for (const relation of list) {
                this.putGroupRelation(relation);
            }
        }
    }


    public removeGroupRelationList(groupId: string) {
        const map: any = this.groupInCategoryMap.get(groupId);
        this.groupInCategoryMap.delete(groupId);
        const list: GroupRelation[] = [];
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
                    categoryMemberMap.delete(groupId);
                }
            }
        }
        return list;
    }

    public removeGroupRelationListByCategoryId(categoryId: string): GroupRelation[] {
        const map = this.categoryMemberListMap.get(categoryId);
        const list: GroupRelation[] = [];
        if (map) {
            this.categoryMemberListMap.delete(categoryId);
            const values = map.values();
            for (const data of values) {
                list.push(data);
            }
        }
        return list;
    }


    public removeGroupRelation(categoryId: string, groupId: string) {
        const categoryMemberMap = this.getCategoryMemberMap(categoryId);
        const relation = categoryMemberMap.get(groupId);
        categoryMemberMap.delete(groupId);
        const map = this.groupInCategoryMap.get(groupId);
        if (map) {
            map.delete(categoryId);
            if (map.size === 0) {
                this.groupInCategoryMap.delete(groupId);
            }
        }
        return relation;
    }

    public getGroupRelationList(categoryId: string): GroupRelation[] {
        const categoryMemberMap = this.getCategoryMemberMap(categoryId);
        const list: GroupRelation[] = [];
        const values = categoryMemberMap.values();
        for (const data of values) {
            list.push(data);
        }
        return list;
    }

    public getGroupRelationByGroupId(groupId: string): GroupRelation {
        let relation: any;
        const map = this.getGroupInCategoryMemberMapByGroupId(groupId);
        const list: GroupRelation[] = [];
        const values = map.values();
        for (const data of values) {
            list.push(data);
        }
        if (list.length > 0) {
            relation = list[0];
        }
        return relation;
    }

    public getGroupRelationSize(categoryId: string): number {
        const categoryMemberList: any = this.categoryMemberListMap.get(categoryId);
        return BaseUtil.isEmpty(categoryMemberList) ? 0 : categoryMemberList.size;
    }

    public getGroupInGroupRelationListByGroupId(groupId: string): GroupRelation[] {
        const map = this.getGroupInCategoryMemberMapByGroupId(groupId);
        const list: GroupRelation[] = [];
        const values = map.values();
        for (const data of values) {
            list.push(data);
        }
        return list;
    }

    public clearGroupRelation(): void {
        this.categoryMemberListMap.clear();
        this.groupInCategoryMap.clear();
    }

    public getCategoryMemberMap(categoryId: string): Map<string, GroupRelation> {
        let map = this.categoryMemberListMap.get(categoryId);
        if (!map) {
            map = new Map<string, GroupRelation>();
            this.categoryMemberListMap.set(categoryId, map);
        }
        return map;
    }

    public getGroupInCategoryMemberMapByGroupId(groupId: string): Map<string, GroupRelation> {
        let map = this.groupInCategoryMap.get(groupId);
        if (!map) {
            map = new Map<string, GroupRelation>();
            this.groupInCategoryMap.set(groupId, map);
        }
        return map;
    }

    /**
     * 是否在好友列表
     *
     * @author: XiaHui
     * @param groupId
     */
    public inMemberList(groupId: string): boolean {
        const has = this.groupInCategoryMap.has(groupId);
        return has;
    }
}
