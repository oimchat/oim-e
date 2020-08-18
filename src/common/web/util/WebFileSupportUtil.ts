import FileTypeUtil from '@/app/common/util/FileTypeUtil';

export default class WebFileSupportUtil {
    public static videos: string[] = [
        'wmv', 'avi', 'mpeg', 'mpg',
        'rm', 'rmvb', 'flv', 'mp4', '3gp',
    ];
    public static audios: string[] = [
        'mp3', 'wma', 'wav', 'aac',
        'amr', 'm4a', 'ogg', 'midi', 'mid',
    ];

    public static images: string[] = [
        'bmp', 'jpg', 'jpeg', 'png', 'tif',
        'gif', 'webp'];

    public static has(name: string, names: string[]) {
        let is = false;
        if (typeof name === 'string' && name) {
            const fileName = name.toLowerCase();
            for (const e of names) {
                if (fileName.endsWith('.' + e)) {
                    is = true;
                    break;
                }
            }
        }
        return is;
    }

    public static isSupportVideoByName(name: string): boolean {
        const is = FileTypeUtil.has(name, WebFileSupportUtil.videos);
        return is;
    }

    public static isSupportAudioByName(name: string): boolean {
        const is = FileTypeUtil.has(name, WebFileSupportUtil.audios);
        return is;
    }

    public static isSupportImageByName(name: string): boolean {
        const is = FileTypeUtil.has(name, WebFileSupportUtil.images);
        return is;
    }

    public static isSupportImageByFile(file: File): boolean {
        let is = false;
        if (file) {
            const name = file.name;
            is = WebFileSupportUtil.isSupportImageByName(name);
        }
        return is;
    }
}
