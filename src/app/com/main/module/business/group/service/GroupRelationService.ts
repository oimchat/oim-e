import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import GroupListManager from '@/app/com/main/module/business/group/manager/GroupListManager';
import GroupRelation from '@/app/com/main/module/business/group/bean/GroupRelation';
import DataBackAction from '@/app/base/net/DataBackAction';
import AbstractDataBackAction from '@/app/base/net/AbstractDataBackAction';
import GroupRelationSender from '@/app/com/main/module/business/group/sender/GroupRelationSender';
import GroupRelationBox from '@/app/com/main/module/business/group/box/GroupRelationBox';


export default class GroupRelationService extends AbstractMaterial {

    public setList(list: GroupRelation[]): void {
        if (list) {
            const ccm: GroupListManager = this.appContext.getMaterial(GroupListManager);
            ccm.setRelationList(list);
        }
    }

    public addByGroupId(groupId: string): void {
        if (groupId) {
            const own = this;
            const back: DataBackAction = {
                back(data: any): void {
                    if (data && data.body) {
                        const relation: GroupRelation = data.body;
                        if (relation) {
                            own.add(relation);
                        }
                    }
                },
            } as AbstractDataBackAction;
            const groupRelationSender: GroupRelationSender = this.appContext.getMaterial(GroupRelationSender);
            groupRelationSender.getRelation(groupId, back);
        }
    }

    public add(relation: GroupRelation): void {
        if (relation) {
            const ccm: GroupListManager = this.appContext.getMaterial(GroupListManager);
            ccm.addOrUpdateRelation(relation);
        }
    }

    public updateRemark(groupId: string, remark: string) {
        if (groupId) {
            const ccm: GroupListManager = this.appContext.getMaterial(GroupListManager);
            ccm.updateRemarkName(groupId, remark);
        }
    }

    /**
     * 移动到其他分组
     * @param groupIds
     * @param categoryId
     */
    public moveCategory(groupIds: string[], categoryId: string) {
        if (groupIds && categoryId) {
            const ccm: GroupListManager = this.appContext.getMaterial(GroupListManager);
            const groupListBox: GroupRelationBox = this.appContext.getMaterial(GroupRelationBox);
            const list: GroupRelation[] = [];
            const oldCategoryIds: string[] = [];
            // 找到原来的分组
            for (const groupId of groupIds) {
                const array: GroupRelation[] = groupListBox.getGroupInGroupRelationListByGroupId(groupId);
                for (const d of  array) {
                    list.push(d);
                    oldCategoryIds.push(d.categoryId);
                }
            }
            // 从原来分组移除
            for (const data of list) {
                groupListBox.removeGroupRelation(data.categoryId, data.groupId);
                data.categoryId = categoryId;
                groupListBox.putGroupRelation(data);
            }

            // 原来的分组刷新
            for (const id of oldCategoryIds) {
                ccm.updateCategoryMember(id);
                ccm.updateCategoryMemberCount(id);
            }

            // 新的分组刷新
            ccm.updateCategoryMember(categoryId);
            ccm.updateCategoryMemberCount(categoryId);
        }
    }

    public delete(groupId: string) {
        if (groupId) {
            const ccm: GroupListManager = this.appContext.getMaterial(GroupListManager);
            ccm.deleteGroup(groupId);
        }
    }
}
