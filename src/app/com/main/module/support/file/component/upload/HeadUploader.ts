import UploadResult from '@/app/com/main/module/support/file/data/UploadResult';
import ServerBox from '@/app/com/main/module/business/server/box/ServerBox';
import {Protocol, ServerType} from '@/app/common/config/constant/ServerConstant';
import AbstractUploader from '@/app/com/main/module/support/file/component/upload/AbstractUploader';
import ServerAddress from '@/app/com/main/module/business/server/bean/ServerAddress';
import FileSeverApi from '@/app/com/main/module/support/file/constant/FileSeverApi';

export default class HeadUploader extends AbstractUploader {

    private path: string = FileSeverApi.FILE_UPLOAD;

    public getServerAddress(): ServerAddress | null {
        const serverBox: ServerBox = this.appContext.getMaterial(ServerBox);
        const address = serverBox.getAddress(ServerType.file, Protocol.HTTP);
        return address;
    }

    public getPath(): string {
        return this.path;
    }

    public getServerName(): string {
        return '图片上传服务器';
    }

    public uploadUserHead(
        file: File,
        back: (success: boolean, uploadResult: UploadResult, message?: string) => void,
        progress?: (percent: number) => void): void {
        this.path = FileSeverApi.USER_HEAD_UPLOAD;
        this.upload(file, back, progress);
    }

    public uploadGroupHead(
        file: File,
        back: (success: boolean, uploadResult: UploadResult, message?: string) => void,
        progress?: (percent: number) => void): void {
        this.path = FileSeverApi.GROUP_HEAD_UPLOAD;
        this.upload(file, back, progress);
    }
}
