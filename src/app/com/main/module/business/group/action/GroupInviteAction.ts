import {MethodMapping} from '@/app/base/action/annotation/ActionDecorator';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import GroupInformationConverge from '@/app/com/main/module/business/group/converge/GroupInformationConverge';

export default class GroupInviteAction extends AbstractMaterial {

    private static action: string = '1.3.008';

    @MethodMapping(GroupInviteAction, GroupInviteAction.action, '1.2.0001')
    public inviteApply(data: any): void {
        if (data && data.body) {
            const groupInformationConverge: GroupInformationConverge = this.appContext.getMaterial(GroupInformationConverge);
            groupInformationConverge.inviteInformation(1);
        }
    }

    @MethodMapping(GroupInviteAction, GroupInviteAction.action, '1.2.0003')
    public invitee(data: any): void {
        if (data && data.body) {
            const groupInformationConverge: GroupInformationConverge = this.appContext.getMaterial(GroupInformationConverge);
            groupInformationConverge.inviteeInformation(1);
        }
    }
}
