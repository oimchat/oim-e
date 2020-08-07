import {MethodMapping} from '@/app/base/action/annotation/ActionDecorator';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import GroupRelationService from '@/app/com/main/module/business/group/service/GroupRelationService';
import GroupRelation from '@/app/com/main/module/business/group/bean/GroupRelation';
import GroupInfoService from '@/app/com/main/module/business/group/service/GroupInfoService';
import GroupBusinessService from '@/app/com/main/module/business/group/service/GroupBusinessService';
import SystemInformationService from '@/app/com/client/module/prompt/service/SystemInformationService';
import SystemInformType from '@/app/com/main/data/SystemInformType';

export default class GroupInviteAction extends AbstractMaterial {

    private static action: string = '1.3.008';

    @MethodMapping(GroupInviteAction, GroupInviteAction.action, '1.2.0001')
    public inviteApply(data: any): void {
        if (data && data.body) {
            const systemInformationService: SystemInformationService = this.appContext.getMaterial(SystemInformationService);
            systemInformationService.inform(SystemInformType.TYPE_APPLY_HANDLE, '邀请加入群申请');
        }
    }

    @MethodMapping(GroupInviteAction, GroupInviteAction.action, '1.2.0003')
    public invitee(data: any): void {
        if (data && data.body) {
            const systemInformationService: SystemInformationService = this.appContext.getMaterial(SystemInformationService);
            systemInformationService.inform(SystemInformType.TYPE_APPLY_HANDLE, '被邀请加入群');
        }
    }
}
