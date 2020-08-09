import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import ViewEnum from '@/app/com/client/common/view/ViewEnum';
import MessageAllUnreadView from '@/app/com/main/view/MessageAllUnreadView';

export default class MessageAllUnreadManager extends AbstractMaterial {

    public setItemRed(red: boolean, count: number): void {
        const messageAllUnreadView: MessageAllUnreadView = this.appContext.getView(ViewEnum.MessageAllUnreadView);
        messageAllUnreadView.setRed(red, count);
    }
}
