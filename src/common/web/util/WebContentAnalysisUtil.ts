import Content from '@/app/com/common/chat/Content';
import Section from '@/app/com/common/chat/Section';
import Item from '@/app/com/common/chat/Item';
import FaceValue from '@/app/com/common/chat/item/FaceValue';

import ImageValue from '@/app/com/common/chat/item/ImageValue';
import BaseUtil from '@/app/lib/util/BaseUtil';
import ObjectUtil from '@/app/common/util/ObjectUtil';
import AtValue from '@/app/com/common/chat/item/AtValue';

export default class WebContentAnalysisUtil {

    public static getContent(nodes: NodeListOf<ChildNode>): Content {
        let content: Content | any;
        if (nodes && nodes.length > 0) {
            content = new Content();
            let section: Section = new Section();
            content.sections.push(section);
            for (const n of nodes) {
                const e = n as any;
                let nodeName = e.nodeName;
                nodeName = (nodeName) ? nodeName.toLowerCase() : '';
                if (nodeName === '#text') {
                    const value = e.nodeValue;
                    if ('\n' === value) {
                        section = new Section();
                        content.sections.push(section);
                    } else {
                        const item: Item = new Item();
                        item.type = Item.TYPE_TEXT;
                        item.value = (value) ? value : '';

                        section.items.push(item);
                    }
                }
                if ('br' === nodeName) {

                    section = new Section();
                    content.sections.push(section);
                }

                if (nodeName === 'img') {
                    const url = e.src;
                    const name = e.name;
                    const value = e.getAttribute('value'); // .value;
                    const title = e.getAttribute('title');
                    const path = e.getAttribute('path');
                    if ('face' === (name)) {
                        const item: Item = WebContentAnalysisUtil.getFaceItem(e);
                        if (item) {
                            section.items.push(item);
                        }
                    } else {
                        const item: Item = WebContentAnalysisUtil.getImageItem(e);
                        if (item) {
                            section.items.push(item);
                        }
                    }
                }

                if (nodeName === 'a') {
                    const name = e.name;
                    if ('at' === (name)) {
                        const item: Item = WebContentAnalysisUtil.getAtItem(e);
                        if (item) {
                            section.items.push(item);
                        }
                    }
                }

                if (nodeName === 'pre') {
                    const value = e.innerHTML;
                    const item: Item = new Item();
                    item.type = Item.TYPE_TEXT;
                    item.value = (value) ? value : '';

                    section.items.push(item);
                }

                if (nodeName === 'div') {
                    section = WebContentAnalysisUtil.getSection(e);
                    content.sections.push(section);
                }
            }
        }
        return content;
    }

    public static getSection(element: Element): Section {
        const section: Section = new Section();
        const nodes = element.childNodes;
        if (nodes) {
            for (const e of nodes) {
                let nodeName = e.nodeName;
                nodeName = (nodeName) ? nodeName.toLowerCase() : '';
                if (nodeName === '#text') {
                    const value = e.nodeValue;
                    const item: Item = new Item();
                    item.type = Item.TYPE_TEXT;
                    item.value = (value) ? value : '';

                    section.items.push(item);
                }
                if (nodeName === 'img') {
                    const n = (e as any);

                    const url = n.src;
                    const name = n.name;
                    const value: string = n.value;
                    const title = n.getAttribute('title');

                    if ('face' === (name)) {
                        const item: Item = WebContentAnalysisUtil.getFaceItem(e);
                        if (item) {
                            section.items.push(item);
                        }
                    } else {
                        const item: Item = WebContentAnalysisUtil.getImageItem(e);
                        if (item) {
                            section.items.push(item);
                        }
                    }
                }

                if (nodeName === 'a') {
                    const n = (e as any);
                    const name = n.name;
                    if ('at' === (name)) {
                        const item: Item = WebContentAnalysisUtil.getAtItem(e);
                        if (item) {
                            section.items.push(item);
                        }
                    }
                }
            }
        }
        return section;
    }

    private static getFaceItem(e: any): Item {
        let item: any;

        if (e) {
            const name = e.name;
            const value = e.getAttribute('value'); // .value;
            const title = e.getAttribute('title');
            const path = e.getAttribute('path');

            if (value) {
                let isNetFace = false;
                if (path) {
                    const u = path.toString().toLowerCase();
                    isNetFace = ((u.startsWith('http://') || u.startsWith('https://')));
                }

                const array = value.split(',');
                if (array.length > 1) {
                    const iv: FaceValue = new FaceValue();
                    iv.categoryId = array[0];
                    iv.key = array[1];
                    iv.path = (isNetFace) ? path : '';
                    iv.text = title;

                    item = new Item();
                    item.type = Item.TYPE_FACE;
                    item.value = iv;
                }
            }
        }
        return item;
    }

    private static getImageItem(e: any): Item {
        let item: any;

        if (e) {
            const url = e.src;
            const name = e.name;
            const value = e.getAttribute('value'); // .value;
            const title = e.getAttribute('title');
            const path = e.getAttribute('path');

            if (url) {
                let valueData: any;
                if (BaseUtil.isJson(value)) {
                    valueData = BaseUtil.jsonToObject(value);
                }
                const iv: ImageValue = new ImageValue();
                if (valueData) {
                    ObjectUtil.copyByTargetKey(iv, valueData);
                }
                iv.url = (url) ? url : '';

                item = new Item();
                item.type = Item.TYPE_IMAGE;
                item.value = iv;
            }
        }
        return item;
    }

    private static getAtItem(e: any): Item {
        let item: any;

        if (e) {
            const url = e.src;
            const name = e.name;
            const value = e.getAttribute('value');

            if (value) {
                const text = e.text;
                const iv: AtValue = new AtValue();
                iv.userId = value;
                iv.text = text;

                item = new Item();
                item.type = Item.TYPE_AT;
                item.value = iv;
            }
        }
        return item;
    }
}
