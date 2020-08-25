export default class ImageToFileUtil {


    public static imageFile2Base64(file: File, back: (base64: string) => void): void {
        if (file) {
            if (file.type.match(/^image\//i)) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function() {
                    // 获取到base64格式图片
                    if (typeof back === 'function' && typeof reader.result === 'string') {
                        back(reader.result);
                    }
                    // console.log(reader.result);
                };
            }
        }
    }

    public static isBase64(url: string) {
        let is = false;
        if (url) {
            const reg = /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i;
            is = (reg.test(url));
        }
        return is;
    }

    public static getImageFileByBase64(dataUrl: string): Promise<File> {
        return new Promise<File>((resolve) => {
            /*
             打印信息如下：
             {
              dataURL: "data:image/png;base64,xxx"
              type: "image/jpg"
             }
             */
            const file = ImageToFileUtil.convertBlobToFile(dataUrl);
            resolve(file);
        });
    }

    public static convertBlobToFile(dataUrl: string): File {
        const blob = ImageToFileUtil.convertBase64UrlToBlob(dataUrl);
        // console.log(blob);
        /*
         打印信息如下：
         Blob {size: 9585, type: "image/jpg"}
         */
        const date: Date = new Date();
        const name = '1.png';
        const type = blob.type;

        const lastModified: number = (date) ? date.getTime() : 0;
        const fp = {
            type,
            lastModified,
        } as FilePropertyBag;
        const file = new File([blob], name, fp);
        return file;
    }

    /**
     * 将以base64的图片url数据转换为Blob
     * 用url方式表示的base64图片数据
     */
    public static convertBase64UrlToBlob(dataUrl: string): Blob {

        const array = dataUrl.split(',');
        const type = array[0];
        // 去掉url的头，并转换为byte
        const data = array[1];
        const temp = type.match(/:(.*?);/);
        let mime = 'image/png';
        if (temp) {
            mime = temp[1];
        }

        const bytes = window.atob(data);
        // 处理异常,将ascii码小于0的转换为大于0
        const ab = new ArrayBuffer(bytes.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i);
        }
        return new Blob([ab], {type: mime});
    }

    /*
     * 图片的绝对路径地址 转换成base64编码 如下代码：
     */
    public static getBase64Image(img: any): string {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx: any = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase();
        const dataUrl = canvas.toDataURL('image/' + ext);
        return dataUrl;
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
                const file = ImageToFileUtil.convertBlobToFile(base64);
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
}
