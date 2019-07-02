import View from '@/app/com/main/view/View';

export default interface MessageAreaView extends View {

    showType(type: string): void;

    getType(): string;
}
