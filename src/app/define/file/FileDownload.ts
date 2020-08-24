import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import FileDownloadingInfo from '@/app/com/client/module/file/FileDownloadingInfo';

export default abstract class FileDownload extends AbstractMaterial {

    public abstract download(url: string,
                             fileName: string,
                             size: number,
                             fileDownloadingInfo: FileDownloadingInfo,
                             onProgress?: (total: number, loaded: number) => void,
                             onSpeed?: (size: number, millisecond: number) => void): void;
}
