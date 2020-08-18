import FileTypeUtil from '@/app/common/util/FileTypeUtil';

export default class ImageFileUtil {

    public static isImageByName(name: string): boolean {
        const isImage = FileTypeUtil.isImageByName(name);
        return isImage;
    }

    public static isImageByFile(file: File): boolean {
        let isImage = false;
        if (file) {
            const name = file.name;
            isImage = ImageFileUtil.isImageByName(name);
        }
        return isImage;
    }
}
