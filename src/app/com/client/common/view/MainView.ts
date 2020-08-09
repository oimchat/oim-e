import View from '@/app/com/client/common/view/View';
import Client from '@/app/base/message/client/Client';

export default interface MainView extends View {

    showOtherOnline(offline: boolean, client: Client): void;
}
