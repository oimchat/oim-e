import {MethodMapping} from '@/app/base/annotation/ActionDecorator';
import AbstractMaterial from '@/app/base/AbstractMaterial';
import GroupRelationService from '@/app/com/main/service/GroupRelationService';
import GroupRelation from '@/app/com/bean/GroupRelation';
import GroupInfoService from '@/app/com/main/service/GroupInfoService';
import GroupBusinessService from '@/app/com/main/service/GroupBusinessService';
import SystemInformationService from '@/app/com/main/service/SystemInformationService';
import SystemInformType from '@/app/com/main/data/SystemInformType';

export default class GroupJoinAction extends AbstractMaterial {

    private static action: string = '1.2.206';

    @MethodMapping(GroupJoinAction, GroupJoinAction.action, '1.2.0001')
    public inviteApply(data: any): void {
        if (data && data.body) {
            const systemInformationService: SystemInformationService = this.appContext.getMaterial(SystemInformationService);
            systemInformationService.inform(SystemInformType.TYPE_APPLY_HANDLE, '加入群申请');
        }
    }
}
