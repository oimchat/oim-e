import UploadResult from '@/app/com/main/module/support/file/data/UploadResult';
import ServerBox from '@/app/com/main/module/business/server/box/ServerBox';
import {Protocol, ServerType} from '@/app/common/config/constant/ServerConstant';
import AbstractUploader from '@/app/com/main/module/support/file/component/upload/AbstractUploader';
import ServerAddress from '@/app/com/main/module/business/server/bean/ServerAddress';
import FileSeverApi from '@/app/com/main/module/support/file/constant/FileSeverApi';

export default class ImageUploader extends AbstractUploader {


    public getServerAddress(): ServerAddress | null {
        const serverBox: ServerBox = this.appContext.getMaterial(ServerBox);
        const address = serverBox.getAddress(ServerType.file, Protocol.HTTP);
        return address;
    }

    public getPath(): string {
        return FileSeverApi.IMAGE_UPLOAD;
    }

    public getServerName(): string {
        return '图片上传服务器';
    }

    public uploadImage(
        file: File,
        back: (success: boolean, uploadResult: UploadResult, message?: string) => void,
        progress?: (percent: number) => void): void {
        this.upload(file, back, progress);
    }

    public uploadImages(
        fileMap: Map<string, File>,
        back: (success: boolean, map: Map<string, UploadResult>, message?: string) => void,
        progress?: (percentMap: Map<string, number>) => void): void {
        this.uploads(fileMap, back, progress);
    }
}
