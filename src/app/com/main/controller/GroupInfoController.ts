import AbstractMaterial from '@/app/base/AbstractMaterial';
import Group from '@/app/com/bean/Group';
import GroupInfoSender from '@/app/com/main/sender/GroupInfoSender';
import DataBackAction from '@/app/base/net/DataBackAction';
import GroupQuery from '@/app/com/data/GroupQuery';
import Page from '@/app/com/data/common/Page';

export default class GroupInfoController extends AbstractMaterial {

    public queryGroupList(groupQuery: GroupQuery, page: Page, back?: DataBackAction): void {
        const groupInfoSender: GroupInfoSender = this.appContext.getMaterial(GroupInfoSender);
        groupInfoSender.queryGroupList(groupQuery, page, back);
    }
}
