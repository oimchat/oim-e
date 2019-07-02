import ImageValue from '@/app/com/data/chat/content/item/ImageValue';
import BaseUtil from '@/app/lib/util/BaseUtil';
import Content from '@/app/com/data/chat/content/Content';
import CoreContentUtil from '@/app/com/main/util/CoreContentUtil';
import FileUtil from '@/platform/util/FileUtil';
import WebImagePathUtil from '@/app/com/main/util/WebImagePathUtil';
import Item from '@/app/com/data/chat/content/Item';

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
}
