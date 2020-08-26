import DefineData from '@/app/define/extend/DefineData';
import FileDownload from '@/app/define/file/FileDownload';
import FileProgressInfo from '@/app/com/client/module/file/FileProgressInfo';

export default class FileDownloadDefineData extends DefineData {

    public download(url: string,
                    fileName: string,
                    size: number,
                    fileDownloadingInfo: FileProgressInfo,
                    onProgress?: (total: number, loaded: number) => void,
                    onSpeed?: (size: number, millisecond: number) => void): void {
        if (this.has) {
            const o = this.get();
            if (o instanceof FileDownload) {
                const fd = o as FileDownload;
                fd.download(url, fileName, size, fileDownloadingInfo, onProgress, onSpeed);
            }
        }
    }
}
