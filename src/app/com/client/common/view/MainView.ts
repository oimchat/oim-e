import User from '@/app/com/main/module/business/user/bean/User';
import View from '@/app/com/client/common/view/View';
import Client from '@/app/base/message/client/Client';

export default interface MainView extends View {

    showTab(key: string): void;

    showOtherOnline(offline: boolean, client: Client): void;

}
