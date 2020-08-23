import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import UploadResult from '@/app/com/main/module/support/file/data/UploadResult';
import FileUploader from '@/app/com/main/module/support/file/component/upload/FileUploader';

export default class ContentUploadFileService extends AbstractMaterial {

    public uploadFile(file: File,
                      back: (success: boolean, uploadResult: UploadResult, message?: string) => void,
                      progress?: (percent: number) => void): void {
        const fileUploader: FileUploader = this.appContext.getMaterial(FileUploader);
        fileUploader.uploadFile(file, back, progress);
    }

    public uploadFiles(fileMap: Map<string, File>, back: (success: boolean, map: Map<string, UploadResult>, message?: string) => void): void {
        const fileUploader: FileUploader = this.appContext.getMaterial(FileUploader);
        fileUploader.uploadFiles(fileMap, back);
    }
}
