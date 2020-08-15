import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import WorkViewEnum from '@/app/com/common/view/WorkViewEnum';
import MessageAllUnreadView from '@/app/com/main/view/MessageAllUnreadView';

export default class MessageAllUnreadManager extends AbstractMaterial {

    public setItemRed(red: boolean, count: number): void {
        const messageAllUnreadView: MessageAllUnreadView = this.appContext.getView(WorkViewEnum.MessageAllUnreadView);
        messageAllUnreadView.setRed(red, count);
    }
}
