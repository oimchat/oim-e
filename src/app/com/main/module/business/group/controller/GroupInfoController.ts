import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import Group from '@/app/com/main/module/business/group/bean/Group';
import GroupInfoSender from '@/app/com/main/module/business/group/sender/GroupInfoSender';
import DataBackAction from '@/app/base/net/DataBackAction';
import GroupQuery from '@/app/com/main/module/business/group/data/GroupQuery';
import Page from '@/app/com/common/data/Page';

export default class GroupInfoController extends AbstractMaterial {

    public queryGroupList(groupQuery: GroupQuery, page: Page, back?: DataBackAction): void {
        const groupInfoSender: GroupInfoSender = this.appContext.getMaterial(GroupInfoSender);
        groupInfoSender.queryGroupList(groupQuery, page, back);
    }
}
