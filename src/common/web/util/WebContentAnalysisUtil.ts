import Content from '@/app/com/common/chat/Content';
import Section from '@/app/com/common/chat/Section';
import Item from '@/app/com/common/chat/Item';
import FaceValue from '@/app/com/common/chat/item/FaceValue';

import ImageValue from '@/app/com/common/chat/item/ImageValue';

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
                    if ('face' === (name)) {
                        if (value) {
                            let isNetFace = false;
                            if (url) {
                                const u = url.toString().toLowerCase();
                                isNetFace = ((u.startsWith('http://') || u.startsWith('https://')));
                            }

                            const array = value.split(',');
                            if (array.length > 1) {
                                const iv: FaceValue = new FaceValue();
                                iv.categoryId = array[0];
                                iv.key = array[1];
                                iv.path = (isNetFace) ? url : '';
                                iv.text = title;

                                const item: Item = new Item();
                                item.type = Item.TYPE_FACE;
                                item.value = iv;

                                section.items.push(item);
                            }
                        }
                    } else {
                        if (url) {
                            const iv: ImageValue = new ImageValue();
                            iv.url = (url) ? url : '';

                            const item: Item = new Item();
                            item.type = Item.TYPE_IMAGE;
                            item.value = iv;

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
                        if (value) {
                            let isNetFace = false;
                            if (url) {
                                const u = url.toString().toLowerCase();
                                isNetFace = ((u.startsWith('http://') || u.startsWith('https://')));
                            }

                            const array = value.split(',');
                            if (array.length > 1) {
                                const iv: FaceValue = new FaceValue();
                                iv.categoryId = array[0];
                                iv.key = array[1];
                                iv.path = (isNetFace) ? url : '';
                                iv.text = title;

                                const item: Item = new Item();
                                item.type = Item.TYPE_FACE;
                                item.value = iv;

                                section.items.push(item);
                            }
                        }
                    } else {
                        if (url) {
                            const iv: ImageValue = new ImageValue();
                            iv.url = (url) ? url : '';

                            const item: Item = new Item();
                            item.type = Item.TYPE_IMAGE;
                            item.value = iv;

                            section.items.push(item);
                        }
                    }
                }
            }
        }
        return section;
    }
}
