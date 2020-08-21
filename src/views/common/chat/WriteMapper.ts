import DocumentUtil from '@/common/web/util/DocumentUtil';

export default class WriteMapper {

    private element: Element = document.createElement('div');

    public setElement(element: Element) {
        this.element = element;
    }

    public insertHtmlAtCursor(html: string) {
        DocumentUtil.insertAtCursor(this.element, html);
    }

    public setInnerHTML(html: string) {
        if (this.hasElement()) {
            this.element.innerHTML = html;
        }
    }

    public getInnerHTML(): string {
        let html = '';
        if (this.hasElement()) {
            html = this.element.innerHTML;
        }
        return html;
    }

    public getChildNodes(): NodeListOf<ChildNode> {
        return this.element.childNodes;
    }

    public keepCursorLastIndex() {
        const selection = window.getSelection();
        const createRange = document.createRange();
        if (this.element !== document.activeElement) { // 如果dom没有获取到焦点，追加
            if (this.element instanceof HTMLElement) {
                // 解决ff不获取焦点无法定位问题
                (this.element as HTMLElement).focus();
            }
        }
        if (selection) {// ie11 10 9 ff safari
            // 创建range
            const range = window.getSelection();
            if (range) {
                // range 选择obj下所有子内容
                range.selectAllChildren(this.element);
                // 光标移至最后
                range.collapseToEnd();
            }
        } else if (document.getSelection()) {// ie10 9 8 7 6 5
            const documentSelection = document.getSelection();
            // 创建选择对象
            const range = document.createRange();
            if (documentSelection) {
                range.collapse(true);
                documentSelection.removeAllRanges();
                documentSelection.addRange(range);
            }
        }
    }

    public getCursorLocation(): { x: number, y: number, text: string, node: Node | any } {
        return DocumentUtil.getCursorLocation(this.element);
    }

    private hasElement(): boolean {
        return !!this.element;
    }
}
