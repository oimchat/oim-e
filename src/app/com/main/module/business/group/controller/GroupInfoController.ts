import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import Group from '@/app/com/main/module/business/group/bean/Group';
import GroupInfoSender from '@/app/com/main/module/business/group/sender/GroupInfoSender';
import DataBackAction from '@/app/base/net/DataBackAction';
import GroupQuery from '@/app/com/main/module/business/group/data/GroupQuery';
import Page from '@/app/com/common/data/Page';
import ObjectUtil from '@/app/common/util/ObjectUtil';

export default class GroupInfoController extends AbstractMaterial {

    public queryGroupList(groupQuery: GroupQuery, page: Page, back?: DataBackAction): void {
        const groupInfoSender: GroupInfoSender = this.appContext.getMaterial(GroupInfoSender);
        groupInfoSender.queryGroupList(groupQuery, page, back);
    }

    public queryList(query: GroupQuery, page: Page, back: (success: boolean, message: string, groups: Group[]) => void) {
        let success = false;
        let message = '请求失败！';
        let groups: Group[] = [];
        const dataBackAction: DataBackAction = {
            back(data: any): void {
                if (data) {
                    const info = data.info;
                    if (info) {
                        if (info.success && data.body) {
                            const p = data.body.page;
                            groups = data.body.items;
                            success = true;
                            message = '';

                            if (p) {
                                ObjectUtil.copyByTargetKey(page, p);
                            }
                        }
                    }
                }
                back(success, message, groups);
            },
            lost(data: any): void {
                // no
                message = '请求失败！';
                back(success, message, groups);
            },
            timeOut(data: any): void {
                // no
                message = '请求超时！';
                back(success, message, groups);
            },
        } as DataBackAction;
        const groupInfoSender: GroupInfoSender = this.appContext.getMaterial(GroupInfoSender);
        groupInfoSender.queryGroupList(query, page, dataBackAction);
    }
}
