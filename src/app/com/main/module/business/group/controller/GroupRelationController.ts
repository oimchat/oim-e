import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Page from '@/app/com/common/data/Page';
import GroupJoinHandleData from '@/app/com/main/module/business/group/data/GroupJoinHandleData';
import GroupJoinApplyData from '@/app/com/main/module/business/group/data/GroupJoinApplyData';
import GroupJoinVerifyAnswer from '@/app/com/main/module/business/group/bean/GroupJoinVerifyAnswer';
import GroupJoinSender from '@/app/com/main/module/business/group/sender/GroupJoinSender';
import GroupRelationSender from '@/app/com/main/module/business/group/sender/GroupRelationSender';
import GroupRelationBox from '@/app/com/main/module/business/group/box/GroupRelationBox';
import GroupRelation from '@/app/com/main/module/business/group/bean/GroupRelation';

export default class GroupRelationController extends AbstractMaterial {


    public getRelation(groupId: string, back?: DataBackAction, parallel?: boolean): void {
        const groupRelationSender: GroupRelationSender = this.appContext.getMaterial(GroupRelationSender);
        groupRelationSender.getRelation(groupId, back, parallel);
    }

    public updateRemark(groupId: string, remark: string, back?: DataBackAction, parallel?: boolean): void {
        const groupRelationSender: GroupRelationSender = this.appContext.getMaterial(GroupRelationSender);
        groupRelationSender.updateRemark(groupId, remark, back, parallel);
    }

    public moveCategory(groupIds: string[], categoryId: string, back?: DataBackAction, parallel?: boolean): void {
        const groupListBox: GroupRelationBox = this.appContext.getMaterial(GroupRelationBox);
        const ids: string[] = [];
        if (groupIds) {
            for (const id of groupIds) {
                let has = false;

                const list: GroupRelation[] = groupListBox.getGroupInGroupRelationListByGroupId(id);
                if (list) {
                    for (const gr of list) {
                        if (categoryId === gr.categoryId) {
                            has = true;
                            break;
                        }
                    }
                }
                if (!has) {
                    ids.push(id);
                }
            }
        }

        if (ids.length > 0) {
            const groupRelationSender: GroupRelationSender = this.appContext.getMaterial(GroupRelationSender);
            groupRelationSender.moveCategory(ids, categoryId, back, parallel);
        }
    }
}
