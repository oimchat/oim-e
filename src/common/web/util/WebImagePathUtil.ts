import Platform from '@/app/common/util/Platform';

export default class WebImagePathUtil {
    public static isWindows(): boolean {
        return Platform.isWindows();
    }

    /**
     * 将图片在html的img标签中的本地图片src转成文件路径
     *
     * @author XiaHui
     * @date 2017-11-10 10:44:24
     * @param path
     * @return
     */
    public static fileImageSourceToPath(path: string): string {
        let url: string = '';
        if (null != path) {
            if (path.startsWith('file:')) {
                const l = path.length;
                url = (l >= 5) ? path.substring(5, l) : path;
                // url = path.replace("file:", "");
                if (WebImagePathUtil.isWindows()) {
                    const ul = url.length;
                    let index = -1;
                    for (let i = 0; i < ul; i++) {
                        const charCode = url.charAt(i);
                        if ('/' !== charCode) {
                            break;
                        }
                        index++;
                    }
                    const length = url.length;
                    if (index > -1 && index < length) {
                        url = url.substring(index + 1, length);
                    }
                    url = url.replace(new RegExp('/', 'g'), '\\');
                } else {
                    url = url.replace(new RegExp('\\', 'g'), '/');
                }
            } else {
                url = path;
            }
        }
        return url;
    }

    /**
     * 本地图片文件路径转html<img> 标签src
     *
     * @author: XiaHui
     * @param path
     * @return
     * @createDate: 2017-12-25 15:48:00
     * @update: XiaHui
     * @updateDate: 2017-12-25 15:48:00
     */
    public static pathToFileImageSource(path: string): string {
        let temp: string = '';
        if (path) {
            if (path.startsWith('http')) {
                temp = path;
            } else if (path.startsWith('file:')) {
                temp = path;
            } else {
                const p = path.replace('\\', '/');
                if (p.startsWith('/')) {
                    temp = 'file:' + p;
                } else {
                    temp = 'file:/' + p;
                }
            }
        }
        return temp;
    }
}
