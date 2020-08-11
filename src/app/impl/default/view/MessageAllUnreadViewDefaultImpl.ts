import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import MessageAllUnreadView from '@/app/com/main/view/MessageAllUnreadView';

export default class MessageAllUnreadViewDefaultImpl extends AbstractMaterial implements MessageAllUnreadView {

    public setRed(red: boolean, count: number): void {
        // no
    }
}
