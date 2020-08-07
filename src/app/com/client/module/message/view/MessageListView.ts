import View from '@/app/com/client/common/view/View';

export default interface MessageListView extends View {

    addOrUpdateItem(type: string, key: string, name: string, avatar: string, gray: boolean, onSelect: (key: string) => void, onDelete: (key: string) => void): void;

    hasItem(type: string, key: string): boolean;

    updateItemText(type: string, key: string, text: string, time: string): void;

    removeItem(type: string, key: string): void;

    setItemRed(type: string, key: string, red: boolean, count: number): void;

    isItemShowing(type: string, key: string): boolean;

    selectItem(type: string, key: string): void;

    clear(): void;
}