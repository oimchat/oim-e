import {MethodMapping} from '@/app/base/action/annotation/ActionDecorator';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import GroupInfoService from '@/app/com/main/module/business/group/service/GroupInfoService';

export default class GroupInfoAction extends AbstractMaterial {

    private static action: string = '1.3.001';

    @MethodMapping(GroupInfoAction, GroupInfoAction.action, '1.2.0001')
    public update(data: any): void {
        if (data && data.body) {
            const groupId: string = data.body.id;
            if (groupId) {
                const groupService: GroupInfoService = this.appContext.getMaterial(GroupInfoService);
                groupService.updateById(groupId);
            }
        }
    }

    @MethodMapping(GroupInfoAction, GroupInfoAction.action, '1.2.0002')
    public updateHead(data: any): void {
        if (data && data.body) {
            const groupId: string = data.body.id;
            if (groupId) {
                const groupService: GroupInfoService = this.appContext.getMaterial(GroupInfoService);
                groupService.updateById(groupId);
            }
        }
    }
}
