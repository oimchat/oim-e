import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import DataChange from '@/app/base/event/DataChange';
import Group from '../bean/Group';

export default class GroupListener extends AbstractMaterial {

    private changeEvents: Array<DataChange<Group>> = [];

    public handleChangeEvent(group: Group): void {
        for (const e of this.changeEvents) {
            e.change(group);
        }
    }

    public addChangeEvent(e: DataChange<Group>) {
        if (this.changeEvents.includes(e)) {
            this.changeEvents.push(e);
        }
    }
}
