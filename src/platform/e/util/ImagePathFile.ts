import ImageValue from '@/app/com/data/chat/content/item/ImageValue';
import BaseUtil from '@/app/lib/util/BaseUtil';
import Content from '@/app/com/data/chat/content/Content';
import CoreContentUtil from '@/app/com/main/util/CoreContentUtil';
import FileUtil from '@/platform/e/util/FileUtil';
import WebImagePathUtil from '@/app/com/main/util/WebImagePathUtil';
import Item from '@/app/com/data/chat/content/Item';
import ImageToFileUtil from '@/common/web/util/ImageToFileUtil';

export default class ImagePathFile {

    public static getFileMap(content: Content): Map<string, File> {
        const map: Map<string, File> = new Map<string, File>();
        if (content) {
            const items = CoreContentUtil.getImageItemList(content);
            if (items && items.length > 0) {
                for (const item of items) {
                    const iv: ImageValue = BaseUtil.jsonToObject(item.value);
                    if (iv) {
                        const url = iv.url;
                        if (url && url.startsWith('file')) {
                            const fileUrl = new URL(url);
                            const path = WebImagePathUtil.fileImageSourceToPath(url);
                            const file: File = FileUtil.getFileByPath(path);
                            if (file) {
                                map.set(url, file);
                            }
                        }
                    }
                }
            }
        }
        return map;
    }

    public static getFileMapByItems(items: Item[]): Map<string, File> {
        const map: Map<string, File> = new Map<string, File>();

        if (items && items.length > 0) {
            for (const item of items) {
                const iv: ImageValue = BaseUtil.jsonToObject(item.value);
                if (iv) {
                    const url = iv.url;
                    if (url && url.startsWith('file')) {
                        const fileUrl = new URL(url);
                        const path = WebImagePathUtil.fileImageSourceToPath(url);
                        const file: File = FileUtil.getFileByPath(path);
                        if (file) {
                            map.set(url, file);
                        }
                    }
                }
            }
        }
        return map;
    }

    public static handleFileImageItems(items: Item[], back: (map: Map<string, File>) => void): void {
        const emptyMap: Map<string, File> = new Map<string, File>();

        if (items && items.length > 0) {
            const urls: string[] = [];
            for (const item of items) {
                const iv: ImageValue = BaseUtil.jsonToObject(item.value);
                if (iv) {
                    const url = iv.url;
                    if (url && url.startsWith('file')) {
                        urls.push(url);
                    }
                }
            }

            if (urls.length > 0) {
                ImageToFileUtil.handleImageFiles(urls, (map) => {
                    back(map);
                });
            } else {
                back(emptyMap);
            }
        } else {
            back(emptyMap);
        }
    }
}
