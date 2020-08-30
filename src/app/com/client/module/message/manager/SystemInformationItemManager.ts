import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import WorkViewEnum from '@/app/com/common/view/WorkViewEnum';
import MessageListView from '@/app/com/client/module/message/view/MessageListView';
import SystemInformationItemEvent from '@/app/com/main/module/common/event/SystemInformationItemEvent';

export default class SystemInformationItemManager extends AbstractMaterial {
    private type = 'system_information';

    public show(key: string) {
        this.selectItem(key);
    }

    public addOrUpdate(key: string,
                       value: any,
                       onSelect: (key: any, value: any) => void,
                       onDelete: (key: string, value: any) => void) {
        const name = '信息';
        const avatar = 'assets/general/common/images/common/head/system/inform.png';
        const gray = false;
        const systemInformItemEvent: SystemInformationItemEvent = this.appContext.getMaterial(SystemInformationItemEvent);

        const messageListView: MessageListView = this.appContext.getView(WorkViewEnum.MessageListView);
        messageListView.addOrUpdateItem(this.type, key, name, avatar, gray, value, onSelect, onDelete);
    }

    public selectItem(key: string) {
        const messageListView: MessageListView = this.appContext.getView(WorkViewEnum.MessageListView);
        messageListView.selectItem(this.type, key);
    }

    public hasItem(key: string): boolean {
        const messageListView: MessageListView = this.appContext.getView(WorkViewEnum.MessageListView);
        return messageListView.hasItem(this.type, key);
    }

    public deleteItem(key: string) {
        const messageListView: MessageListView = this.appContext.getView(WorkViewEnum.MessageListView);
        messageListView.removeItem(this.type, key);
    }

    public updateItemText(key: string, text: string, timeText: string, timestamp: number): void {
        const messageListView: MessageListView = this.appContext.getView(WorkViewEnum.MessageListView);
        messageListView.updateItemText(this.type, key, text, timeText, timestamp);
    }

    public setItemRed(key: string, red: boolean, count: number): void {
        const messageListView: MessageListView = this.appContext.getView(WorkViewEnum.MessageListView);
        messageListView.setItemRed(this.type, key, red, count);
    }
}
