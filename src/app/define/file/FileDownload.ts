import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import FileProgressInfo from '@/app/com/client/module/file/FileProgressInfo';

export default abstract class FileDownload extends AbstractMaterial {

    public abstract download(url: string,
                             fileName: string,
                             size: number,
                             fileDownloadingInfo: FileProgressInfo,
                             onProgress?: (total: number, loaded: number) => void,
                             onSpeed?: (size: number, millisecond: number) => void): void;
}
