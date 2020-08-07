import View from '@/app/com/client/common/view/View';

export default interface VisibleView extends View {

    setVisible(visible: boolean): void;

    isVisible(): boolean;
}
