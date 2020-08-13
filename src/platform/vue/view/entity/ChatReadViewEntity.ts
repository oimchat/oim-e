export default interface ChatReadViewEntity {

    setScrollTop: (size: number) => void;

    updateScrollIntoView: (viewId: string) => void;

    getScrollHeight: () => number;
}
