import View from '@/app/com/client/common/view/View';

export default interface MessageListView extends View {

    addOrUpdateItem(type: string,
                    key: string,
                    name: string,
                    avatar: string,
                    gray: boolean,
                    value: any,
                    onSelect: (key: any, value: any) => void,
                    onDelete: (key: string, value: any) => void): void;

    hasItem(type: string, key: string): boolean;

    updateItemText(type: string, key: string, text: string, timeText: string, timestamp: number): void;

    removeItem(type: string, key: string): void;

    setItemRed(type: string, key: string, red: boolean, count: number): void;

    isItemShowing(type: string, key: string): boolean;

    selectItem(type: string, key: string): void;

    clear(): void;
}
