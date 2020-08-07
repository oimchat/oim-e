import View from '@/app/com/client/common/view/View';

export default interface MessageAreaView extends View {

    showType(type: string): void;

    getType(): string;
}
