export default class DocumentUtil {

    public static insertAtCursor(e: Element, html: string) {
        if (e) {
            if (e !== document.activeElement) { // 如果dom没有获取到焦点，追加
                if (e instanceof HTMLElement) {
                    (e as HTMLElement).focus();
                }
            }
            const selection = window.getSelection();
            const createRange = document.createRange();
            const rangeCount = (selection) ? selection.rangeCount : 0;
            if (selection && rangeCount > 0 && selection.getRangeAt) {
                let range = selection.getRangeAt(0);
                if (!range) {
                    range = createRange;
                }
                if (range) {
                    const element = document.createElement('p');
                    element.innerHTML = html;
                    // const nodes = element.childNodes;
                    // const l = nodes.length;
                    const list: Node[] = [];
                    for (const n of element.childNodes) {
                        list.splice(0, 0, n);
                    }
                    let node;
                    const l = list.length;
                    for (let i = l - 1; i >= 0; i--) {
                        node = list[i];
                        if (node) {
                            range.insertNode(node);
                        }
                    }
                    if (node) {
                        range.setStartAfter(node);
                        range.collapse(true);
                        selection.removeAllRanges();
                        selection.addRange(range);
                    }
                }
            }
        }
    }

    public static appendElement(e: Element, html: string) {
        if (e && html) {
            const element = document.createElement('p');
            element.innerHTML = html;
            for (const n of element.childNodes) {
                e.appendChild(n);
            }
            // e.append(html);
        }
    }

    public static getCursorLocation(e: Element): { x: number, y: number, text: string, node: Node | any } {
        const data: { x: number, y: number, text: string, node: Node | any } = {x: 0, y: 0, text: '', node: null};
        const selection = window.getSelection();
        const createRange = document.createRange();
        const rangeCount = (selection) ? selection.rangeCount : 0;
        if (selection && rangeCount > 0 && selection.getRangeAt) {
            const range = selection.getRangeAt(0).cloneRange();
            if (range.getClientRects) {
                range.collapse(true);
                let rect: any;
                const rects = range.getClientRects();
                if (rects && rects.length > 0) {
                    rect = rects[0];
                }
                // 光标在行首时，rect为undefined
                if (rect) {
                    data.x = rect.left;
                    data.y = rect.top;
                }
            }
            // if (range.endContainer) {
            //     if (range.endContainer.nodeValue) {
            //         data.text = range.endContainer.nodeValue;
            //     }
            // }
            if (range.startContainer) {
                if (range.startContainer.nodeValue) {
                    data.text = range.startContainer.nodeValue;
                }
                data.node = range.startContainer;
            }
        }
        return data;
    }
}
