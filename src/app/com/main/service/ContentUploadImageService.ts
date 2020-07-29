import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import UploadResult from '@/app/com/main/data/UploadResult';
import ImageUploader from '@/app/com/main/component/upload/ImageUploader';

export default class ContentUploadImageService extends AbstractMaterial {

    public uploadImage(file: File, back: (success: boolean, uploadResult: UploadResult, message?: string) => void): void {
        const imageUploader: ImageUploader = this.appContext.getMaterial(ImageUploader);
        imageUploader.uploadImage(file, back);
    }

    public uploadImages(fileMap: Map<string, File>, back: (success: boolean, map: Map<string, UploadResult>, message?: string) => void): void {
        const imageUploader: ImageUploader = this.appContext.getMaterial(ImageUploader);
        imageUploader.uploadImages(fileMap, back);
    }
}
