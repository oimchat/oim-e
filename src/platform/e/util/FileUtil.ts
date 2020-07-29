import * as fs from 'fs';
import * as path from 'path';

export default class FileUtil {
    public static getFileByPath(filePath: string): File {
       // const fileUrl = new URL(filePath);

        const buffer = fs.readFileSync(filePath);
        const fileStat = fs.statSync(filePath);

        const fileInfo = {
            buffer, // use this Buffer instead of reading file
            name: path.basename(filePath), // optional when using `path`
            type: '',
            lastModified: fileStat.mtime,
        };
        const blob = new Blob([fileInfo.buffer], {
            type: fileInfo.type,
        });
        const lastModified: number = (fileInfo.lastModified) ? fileInfo.lastModified.getMilliseconds() : 0;
        const fp = {
            type: fileInfo.type,
            lastModified,
        } as FilePropertyBag;


        const file = new File([blob], fileInfo.name, fp);
        return file;
    }

    public static fileExists(filePath: string): boolean {
        try {
            return fs.statSync(filePath).isFile();
        } catch (err) {
            return false;
        }
    }
}
