import ContentWrap from '@/common/vue/data/content/ContentWrap';

export default class ReadMapper {

    public items: ContentWrap [] = [];
    private scrollElement: Element = document.createElement('div');

    public setScrollElement(scrollElement: Element) {
        this.scrollElement = scrollElement;
    }

    public setScrollTop(size: number): void {
        this.scrollElement.scrollTop = size;
    }

    public getScrollHeight() {
        const height = this.scrollElement.scrollHeight;
        return height;
    }

    public updateScrollIntoView(viewId: string) {
        const v = document.getElementById(viewId);
        if (v) {
            const offsetTop = v.offsetTop;
            this.scrollElement.scrollTop = offsetTop;
        }
    }
}
