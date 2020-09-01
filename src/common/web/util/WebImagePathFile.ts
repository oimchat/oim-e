import ImageValue from '@/app/com/common/chat/item/ImageValue';
import BaseUtil from '@/app/lib/util/BaseUtil';
import Item from '@/app/com/common/chat/Item';
import ImageToFileUtil from '@/common/web/util/ImageToFileUtil';

export default class WebImagePathFile {


    public static handleFileImageItems(items: Item[], back: (map: Map<string, File>) => void): void {
        const emptyMap: Map<string, File> = new Map<string, File>();

        if (items && items.length > 0) {
            const urls: string[] = [];
            for (const item of items) {
                if (item.type === Item.TYPE_IMAGE) {
                    const value = item.value;
                    const iv: ImageValue = (value instanceof String) ? BaseUtil.jsonToObject(value.toString()) : value;
                    if (iv) {
                        const url = iv.url;
                        if (url) {
                            if (url.startsWith('file') || ImageToFileUtil.isBase64(url)) {
                                urls.push(url);
                            }
                        }
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
