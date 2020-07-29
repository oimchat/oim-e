import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import ViewEnum from '@/app/com/main/view/ViewEnum';
import MessageAllUnreadView from '@/app/com/main/view/MessageAllUnreadView';

export default class MessageAllUnreadManager extends AbstractMaterial {
    private type = 'message_tab';

    public setItemRed(type: string, red: boolean, count: number): void {
        const messageAllUnreadView: MessageAllUnreadView = this.appContext.getView(ViewEnum.MessageAllUnreadView);
        messageAllUnreadView.setItemRed(type, red, count);
    }

    public isItemShowing(type: string): boolean {
        const messageAllUnreadView: MessageAllUnreadView = this.appContext.getView(ViewEnum.MessageAllUnreadView);
        return messageAllUnreadView.isItemShowing(type);
    }

    public setMessageItemRed(red: boolean, count: number): void {
        this.setItemRed(this.type, red, count);
    }

    public isMessageItemShowing(): boolean {
        return this.isItemShowing(this.type);
    }
}
