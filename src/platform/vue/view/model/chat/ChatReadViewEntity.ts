export default interface ChatReadViewEntity {

    updateScroll: (size: number) => void;

    updateScrollIntoView: (viewId: string) => void;

    getScrollHeight: () => number;
}
