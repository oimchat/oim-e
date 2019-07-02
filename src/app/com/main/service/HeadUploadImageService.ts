import AbstractMaterial from '@/app/base/AbstractMaterial';
import ServerBox from '@/app/com/main/box/ServerBox';
import UploadTool from '@/app/lib/upload/UploadTool';
import {Protocol, ServerType} from '@/app/common/config/constant/ServerConstant';
import {UploadOption} from '@/app/lib/upload/UploadOption';
import UploadResult from '@/app/com/main/data/UploadResult';

export default class HeadUploadImageService extends AbstractMaterial {

    private uploadTool: UploadTool = new UploadTool();

    public uploadUserHead(file: File, back: (success: boolean, uploadResult: UploadResult, message?: string) => void): void {
        if (file) {
            const uploadResult: UploadResult = new UploadResult();
            const serverBox: ServerBox = this.appContext.getMaterial(ServerBox);
            const address = serverBox.getAddress(ServerType.file, Protocol.HTTP);
            if (!address || '0' === address.isEnabled) {
                back(false, uploadResult, '没有可用的图片上传服务器！');
            } else {
                const http = address.address + '/file/v1/head/user/upload';

                const o: UploadOption = new UploadOption((result: any, f: File | null) => {

                    uploadResult.file = f;
                    uploadResult.key = '';
                    uploadResult.result = result;
                    back(true, uploadResult);

                }, (result, f) => {
                    uploadResult.file = f;
                    uploadResult.key = '';
                    uploadResult.result = result;
                    back(false, uploadResult);
                });
                o.action = http;
                o.file = file;
                o.filename = 'file';
                this.uploadTool.upload(o);
            }
        }
    }

    public uploadGroupHead(file: File, back: (success: boolean, uploadResult: UploadResult, message?: string) => void): void {
        if (file) {
            const uploadResult: UploadResult = new UploadResult();
            const serverBox: ServerBox = this.appContext.getMaterial(ServerBox);
            const address = serverBox.getAddress(ServerType.file, Protocol.HTTP);
            if (!address || '0' === address.isEnabled) {
                back(false, uploadResult, '没有可用的图片上传服务器！');
            } else {
                const http = address.address + '/file/v1/head/group/upload';

                const o: UploadOption = new UploadOption((result: any, f: File | null) => {

                    uploadResult.file = f;
                    uploadResult.key = '';
                    uploadResult.result = result;
                    back(true, uploadResult);

                }, (result, f) => {
                    uploadResult.file = f;
                    uploadResult.key = '';
                    uploadResult.result = result;
                    back(false, uploadResult);
                });
                o.action = http;
                o.file = file;
                o.filename = 'file';
                this.uploadTool.upload(o);
            }
        }
    }
}
