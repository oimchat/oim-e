import AbstractMaterial from '@/app/base/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Page from '@/app/com/data/common/Page';
import GroupJoinHandleData from '@/app/com/data/GroupJoinHandleData';
import GroupJoinApplyData from '@/app/com/data/GroupJoinApplyData';
import GroupJoinVerifyAnswer from '@/app/com/bean/GroupJoinVerifyAnswer';
import GroupJoinSender from '@/app/com/main/sender/GroupJoinSender';
import GroupRelationSender from '@/app/com/main/sender/GroupRelationSender';
import GroupListBox from '@/app/com/main/box/GroupListBox';
import GroupRelation from '@/app/com/bean/GroupRelation';

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
        const groupListBox: GroupListBox = this.appContext.getMaterial(GroupListBox);
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
