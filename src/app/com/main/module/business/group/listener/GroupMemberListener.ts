import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import DataChange from '@/app/base/event/DataChange';
import GroupMember from '@/app/com/main/module/business/group/bean/GroupMember';

export default class GroupMemberListener extends AbstractMaterial {

    private changeEvents: Array<DataChange<GroupMember>> = [];

    public handleChangeEvent(data: GroupMember): void {
        for (const e of this.changeEvents) {
            e.change(data);
        }
    }

    public addChangeEvent(e: DataChange<GroupMember>) {
        if (this.changeEvents.includes(e)) {
            this.changeEvents.push(e);
        }
    }
}
