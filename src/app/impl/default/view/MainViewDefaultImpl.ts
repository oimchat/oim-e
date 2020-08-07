import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import MainView from '@/app/com/client/common/view/MainView';
import Client from '@/app/base/message/client/Client';

export default class MainViewDefaultImpl extends AbstractMaterial implements MainView {

    public showOtherOnline(offline: boolean, client: Client): void {
        // no
    }

    public showTab(key: string): void {
        // no
    }
}
