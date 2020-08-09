import View from '@/app/com/client/common/view/View';

export default interface MessageAllUnreadView extends View {

    setRed(red: boolean, count: number): void;
}
