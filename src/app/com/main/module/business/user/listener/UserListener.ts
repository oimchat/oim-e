import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import User from '@/app/com/main/module/business/user/bean/User';
import DataChange from '@/app/base/event/DataChange';

export default class UserListener extends AbstractMaterial {

    private changeEvents: Array<DataChange<User>> = [];

    public handleChangeEvent(user: User): void {
        for (const e of this.changeEvents) {
            e.change(user);
        }
    }

    public addChangeEvent(e: DataChange<User>) {
        if (this.changeEvents.includes(e)) {
            this.changeEvents.push(e);
        }
    }
}
