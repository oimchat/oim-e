import AbstractMaterial from '@/app/base/AbstractMaterial';
import ViewEnum from '@/app/com/main/view/ViewEnum';
import MessageListView from '@/app/com/main/view/MessageListView';
import SystemInformationItemEvent from '@/app/com/main/function/SystemInformationItemEvent';

export default class SystemInformationItemManager extends AbstractMaterial {
    private type = 'system_information';

    public show(key: string) {
        this.addOrUpdate(key);
        this.selectItem(key);
    }

    public addOrUpdate(key: string) {
        const name = '信息';
        const avatar = 'assets/images/common/head/system/inform.png';
        const gray = false;
        const systemInformItemEvent: SystemInformationItemEvent = this.appContext.getMaterial(SystemInformationItemEvent);

        const messageListView: MessageListView = this.appContext.getView(ViewEnum.MessageListView);
        messageListView.addOrUpdateItem(this.type, key, name, avatar, gray, (k: string) => {
            systemInformItemEvent.onSelect(key);
        }, (k: string) => {
            systemInformItemEvent.onDelete(k);
        });
    }

    public selectItem(key: string) {
        const messageListView: MessageListView = this.appContext.getView(ViewEnum.MessageListView);
        messageListView.selectItem(this.type, key);
    }

    public hasItem(key: string): boolean {
        const messageListView: MessageListView = this.appContext.getView(ViewEnum.MessageListView);
        return messageListView.hasItem(this.type, key);
    }

    public deleteItem(key: string) {
        const messageListView: MessageListView = this.appContext.getView(ViewEnum.MessageListView);
        messageListView.removeItem(this.type, key);
    }

    public updateItemText(key: string, text: string, time: string): void {
        const messageListView: MessageListView = this.appContext.getView(ViewEnum.MessageListView);
        messageListView.updateItemText(this.type, key, text, time);
    }

    public setItemRed(key: string, red: boolean, count: number): void {
        const messageListView: MessageListView = this.appContext.getView(ViewEnum.MessageListView);
        messageListView.setItemRed(this.type, key, red, count);
    }
}
