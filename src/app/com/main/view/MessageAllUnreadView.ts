import View from '@/app/com/client/common/view/View';

export default interface MessageAllUnreadView extends View {

    setItemRed(type: string, red: boolean, count: number): void;

    isItemShowing(type: string): boolean;
}
