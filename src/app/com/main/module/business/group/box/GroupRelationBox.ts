import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import BaseUtil from '@/app/lib/util/BaseUtil';
import GroupRelation from '@/app/com/main/module/business/group/bean/GroupRelation';

export default class GroupRelationBox extends AbstractMaterial {

    /*** 分组中的成员列表<categoryId,Map<groupId, GroupRelation>>*/
    private categoryMemberListMap: Map<string, Map<string, GroupRelation>> = new Map<string, Map<string, GroupRelation>>();
    /*** 用户所在的分组<groupId,Map<categoryId, GroupRelation>>*/
    private groupInCategoryMap: Map<string, Map<string, GroupRelation>> = new Map<string, Map<string, GroupRelation>>();


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
