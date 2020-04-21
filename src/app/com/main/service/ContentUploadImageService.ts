import AbstractMaterial from '@/app/base/AbstractMaterial';
import ServerBox from '@/app/com/main/box/ServerBox';
import UploadTool from '@/app/lib/upload/UploadTool';
import {Protocol, ServerType} from '@/app/common/config/constant/ServerConstant';
import {UploadOption} from '@/app/lib/upload/UploadOption';
import UploadResult from '@/app/com/main/data/UploadResult';

export default class ContentUploadImageService extends AbstractMaterial {

    private uploadTool: UploadTool = new UploadTool();

    public uploadImages(fileMap: Map<string, File>, back: (success: boolean, map: Map<string, UploadResult>, message?: string) => void): void {

        if (fileMap && fileMap.size > 0) {
            const resultMap: Map<string, UploadResult> = new Map<string, UploadResult>();
            const serverBox: ServerBox = this.appContext.getMaterial(ServerBox);
            const address = serverBox.getAddress(ServerType.file, Protocol.HTTP);
            if (!address || !address.enabled) {
                back(false, resultMap, '没有可用的图片上传服务器！');
            } else {
                const http = address.address + '/v1/picture/image/upload';
                const keys = fileMap.keys();

                for (const key of  keys) {
                    const file = fileMap.get(key);

                    if (file) {
                        const o: UploadOption = new UploadOption((result: any, f: File | null) => {
                            const uploadResult: UploadResult = new UploadResult();
                            uploadResult.file = f;
                            uploadResult.key = key;
                            uploadResult.result = result;
                            resultMap.set(key, uploadResult);
                            if (resultMap.size === fileMap.size) {
                                back(true, resultMap);
                            }

                        }, (result, f) => {
                            const uploadResult: UploadResult = new UploadResult();
                            uploadResult.file = f;
                            uploadResult.key = key;
                            uploadResult.result = result;
                            resultMap.set(key, uploadResult);
                            if (resultMap.size === fileMap.size) {
                                back(false, resultMap);
                            }
                        });
                        o.action = http;
                        o.file = file;
                        o.filename = 'file';
                        this.uploadTool.upload(o);
                    }
                }
            }
        }
    }
}
