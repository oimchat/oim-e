import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import GroupRelationBox from '@/app/com/main/module/business/group/box/GroupRelationBox';
import GroupAccess from '@/app/com/main/module/business/group/access/GroupAccess';
import Group from '@/app/com/main/module/business/group/bean/Group';
import GroupInfoView from '@/app/com/main/module/business/group/view/GroupInfoView';
import WorkViewEnum from '@/app/com/common/view/WorkViewEnum';

export default class GroupInfoViewController extends AbstractMaterial {

    public showById(id: string) {
        const view: GroupInfoView = this.appContext.getView(WorkViewEnum.GroupInfoView);
        const box: GroupRelationBox = this.appContext.getMaterial(GroupRelationBox);
        if (box.inMemberList(id)) {
            const groupAccess: GroupAccess = this.appContext.getMaterial(GroupAccess);
            groupAccess.getGroupById(id, (success: boolean, message: string, group: Group) => {
                if (success && group) {
                    view.setGroup(group);
                    view.setVisible(true);
                }
            });
        }
    }
}
