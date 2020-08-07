import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import UploadResult from '@/app/com/main/module/support/file/data/UploadResult';
import HeadUploader from '@/app/com/main/module/support/file/component/upload/HeadUploader';

export default class HeadUploadImageService extends AbstractMaterial {

    public uploadUserHead(file: File, back: (success: boolean, uploadResult: UploadResult, message?: string) => void): void {
        if (file) {
            const headUploader: HeadUploader = this.appContext.getMaterial(HeadUploader);
            headUploader.uploadUserHead(file, back);
        }
    }

    public uploadGroupHead(file: File, back: (success: boolean, uploadResult: UploadResult, message?: string) => void): void {
        if (file) {
            const headUploader: HeadUploader = this.appContext.getMaterial(HeadUploader);
            headUploader.uploadGroupHead(file, back);
        }
    }
}
