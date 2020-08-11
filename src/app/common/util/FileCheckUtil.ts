export default class FileCheckUtil {

    public static checkMaxSize(maxSize: number, file: File): boolean {
        let check = false;
        if (file) {
            const size = file.size;
            check = size <= maxSize;
        }
        return check;
    }
}
