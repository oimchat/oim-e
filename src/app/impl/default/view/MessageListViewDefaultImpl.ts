import MessageListView from '@/app/com/client/module/message/view/MessageListView';

import AbstractMaterial from '@/app/base/context/AbstractMaterial';

export default class MessageListViewDefaultImpl extends AbstractMaterial implements MessageListView {


    public addOrUpdateItem(type: string, key: string, name: string, avatar: string, gray: boolean, onSelect: (key: string) => void, onDelete: (userId: string) => void): void {
        // no
    }

    public isItemShowing(type: string, key: string): boolean {
        return false;
    }

    public removeItem(type: string, key: string): void {
        // no
    }

    public setItemRed(type: string, key: string, red: boolean, count: number): void {
        // no
    }

    public updateItemText(type: string, key: string, text: string, time: string): void {
        // no
    }

    public selectItem(type: string, key: string) {
        // no
    }

    public hasItem(type: string, key: string): boolean {
        return false;
    }

    public clear(): void {
        // no
    }
}