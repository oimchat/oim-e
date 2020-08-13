import MessageListView from '@/app/com/client/module/message/view/MessageListView';

import messageListModel from '@/platform/vue/view/model/MessageListModel';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';

export default class MessageListViewImpl extends AbstractMaterial implements MessageListView {


    public addOrUpdateItem(type: string,
                           key: string,
                           name: string,
                           avatar: string,
                           gray: boolean,
                           value: any,
                           onSelect: (key: string, value: any) => void,
                           onDelete: (userId: string, value: any) => void): void {
        messageListModel.addOrUpdateItem(type, key, name, avatar, gray, value, onSelect, onDelete);
    }

    public isItemShowing(type: string, key: string): boolean {
        return messageListModel.isItemShowing(type, key);
    }

    public removeItem(type: string, key: string): void {
        messageListModel.removeItem(type, key);
    }

    public setItemRed(type: string, key: string, red: boolean, count: number): void {
        count = (count > 99) ? 99 : count;
        messageListModel.setItemRed(type, key, red, count);
    }

    public updateItemText(type: string, key: string, text: string, timeText: string, timestamp: number): void {
        messageListModel.updateItemText(type, key, text, timeText, timestamp);
    }

    public selectItem(type: string, key: string) {
        messageListModel.selectItem(type, key);
    }

    public hasItem(type: string, key: string): boolean {
        return messageListModel.hasItem(type, key);
    }

    public clear(): void {
        messageListModel.clear();
    }
}
