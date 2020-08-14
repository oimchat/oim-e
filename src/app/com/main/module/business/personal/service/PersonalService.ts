import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import User from '@/app/com/main/module/business/user/bean/User';
import PersonalManager from '@/app/com/main/module/business/personal/manager/PersonalManager';
import Client from '@/app/base/message/client/Client';
import WorkViewEnum from '@/app/com/common/view/WorkViewEnum';
import MainView from '@/app/com/client/common/view/MainView';
import LaunchOrder from '@/app/LaunchOrder';

export default class PersonalService extends AbstractMaterial {


    public setUser(user: User): void {
        const personalManager: PersonalManager = this.appContext.getMaterial(PersonalManager);
        personalManager.setUser(user);
    }

    public updateStatus(status: string) {
        const personalManager: PersonalManager = this.appContext.getMaterial(PersonalManager);
        personalManager.updateStatus(status);
    }

    public otherOnline(offline: boolean, client: Client) {
        LaunchOrder.start(this, 'otherOnline');
        const mv: MainView = this.appContext.getView(WorkViewEnum.MainView);
        mv.showOtherOnline(offline, client);
    }
}
