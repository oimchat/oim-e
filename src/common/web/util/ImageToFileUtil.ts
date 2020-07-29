import Item from '@/app/com/data/chat/content/Item';
import ImageValue from '@/app/com/data/chat/content/item/ImageValue';
import BaseUtil from '@/app/lib/util/BaseUtil';

export default class ImageToFileUtil {

    /**
     * 将以base64的图片url数据转换为Blob
     * 用url方式表示的base64图片数据
     */
    public static convertBase64UrlToBlob(base64: { dataUrl: string, type: string }): Blob {
        const dataUrl = base64.dataUrl;
        const type = base64.type;
        // 去掉url的头，并转换为byte
        const bytes = window.atob(dataUrl.split(',')[1]);
        // 处理异常,将ascii码小于0的转换为大于0
        const ab = new ArrayBuffer(bytes.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i);
        }
        return new Blob([ab], {type});
    }

    /*
     * 图片的绝对路径地址 转换成base64编码 如下代码：
     */
    public static getBase64Image(img: any): { dataUrl: string, type: string } {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx: any = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase();
        const dataUrl = canvas.toDataURL('image/' + ext);
        return {
            dataUrl,
            type: 'image/' + ext,
        };
    }


    public static getImageFile(url: string): Promise<File> {
        return new Promise<File>((resolve) => {
            const image = new Image();
            image.crossOrigin = '';
            image.src = url;
            image.onload = () => {
                const base64 = ImageToFileUtil.getBase64Image(image);
                // console.log(base64);
                /*
                 打印信息如下：
                 {
                  dataURL: "data:image/png;base64,xxx"
                  type: "image/jpg"
                 }
                 */
                const blob = ImageToFileUtil.convertBase64UrlToBlob(base64);
                // console.log(blob);
                /*
                 打印信息如下：
                 Blob {size: 9585, type: "image/jpg"}
                 */
                const date: Date = new Date();

                const fileInfo = {
                    name: '1.png', // optional when using `path`
                    type: 'image/png',
                    lastModified: date,
                };
                const lastModified: number = (fileInfo.lastModified) ? fileInfo.lastModified.getMilliseconds() : 0;
                const fp = {
                    type: fileInfo.type,
                    lastModified,
                } as FilePropertyBag;


                const file = new File([blob], fileInfo.name, fp);
                resolve(file);
            };
        });
    }


    public static handleImageFiles(urls: string[], back: (map: Map<string, File>) => void) {
        const array: Array<Promise<File>> = [];
        for (const url of urls) {
            const p: Promise<File> = ImageToFileUtil.getImageFile(url);
            array.push(p);
        }
        Promise.all(array).then((values) => {
            const map: Map<string, File> = new Map<string, File>();
            const length = values.length;
            for (let i = 0; i < length; i++) {
                const key = urls[i];
                const file = values[i];
                map.set(key, file);
                back(map);
            }
        });
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
