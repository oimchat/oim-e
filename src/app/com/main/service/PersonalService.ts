import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import User from '@/app/com/bean/User';
import PersonalManager from '@/app/com/main/manager/PersonalManager';
import Client from '@/app/base/message/client/Client';
import ViewEnum from '@/app/com/main/view/ViewEnum';
import MainView from '@/app/com/main/view/MainView';

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
        const mv: MainView = this.appContext.getView(ViewEnum.MainView);
        mv.showOtherOnline(offline, client);
    }
}
