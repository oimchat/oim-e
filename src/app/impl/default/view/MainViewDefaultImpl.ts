import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import MainView from '@/app/com/client/common/view/MainView';
import Client from '@/app/base/message/client/Client';
import LaunchOrder from '@/app/LaunchOrder';
import AppContext from '@/app/base/context/AppContext';

export default class MainViewDefaultImpl extends AbstractMaterial implements MainView {

    public constructor(protected appContext: AppContext) {
        super(appContext);
        LaunchOrder.start(this, 'constructor');
    }

    public showOtherOnline(offline: boolean, client: Client): void {
        // no
    }

    public showTab(key: string): void {
        // no
    }
}
