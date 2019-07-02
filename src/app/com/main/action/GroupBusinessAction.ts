import {MethodMapping} from '@/app/base/annotation/ActionDecorator';
import AbstractMaterial from '@/app/base/AbstractMaterial';
import Group from '@/app/com/bean/Group';
import GroupInfoService from '@/app/com/main/service/GroupInfoService';
import GroupBusinessService from '@/app/com/main/service/GroupBusinessService';

export default class GroupBusinessAction extends AbstractMaterial {

    private static action: string = '1.2.201';

    @MethodMapping(GroupBusinessAction, GroupBusinessAction.action, '1.1.0002')
    public setList(data: any): void {
        if (data && data.body) {
            const list: Group[] = data.body.list;
            if (list) {
                const ccs: GroupBusinessService = this.appContext.getMaterial(GroupBusinessService);
                ccs.setList(list);
            }
        }
    }
}

