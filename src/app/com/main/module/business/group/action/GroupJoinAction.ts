import {MethodMapping} from '@/app/base/action/annotation/ActionDecorator';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import SystemInformationService from '@/app/com/client/module/message/service/SystemInformationService';
import ApplyHandleInformType from '@/app/com/main/data/ApplyHandleInformType';
import GroupJoinApplyListViewService from '@/app/com/main/module/business/group/service/GroupJoinApplyListViewService';
import GroupInformationConverge from '@/app/com/main/module/business/group/converge/GroupInformationConverge';

export default class GroupJoinAction extends AbstractMaterial {

    private static action: string = '1.3.007';

    @MethodMapping(GroupJoinAction, GroupJoinAction.action, '1.2.0001')
    public joinApply(data: any): void {
        if (data && data.body) {
            const groupInformationConverge: GroupInformationConverge = this.appContext.getMaterial(GroupInformationConverge);
            groupInformationConverge.joinInformation(1);
        }
    }
}
