export default class ImageFileUtil {
    public static imageFiles: string[] = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'JPG', 'JPEG', 'PNG', 'GIF', 'BMP'];

    public static isImageByName(name: string): boolean {
        let isImage = false;
        if (typeof name === 'string' && name) {
            let fileName = name.toLowerCase();
            for (const e of ImageFileUtil.imageFiles) {
                if (fileName.endsWith('.' + e)) {
                    isImage = true;
                }
            }
        }
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