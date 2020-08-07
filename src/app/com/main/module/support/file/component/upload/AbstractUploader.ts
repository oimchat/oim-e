import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import UploadTool from '@/app/lib/upload/UploadTool';
import UploadResult from '@/app/com/main/module/support/file/data/UploadResult';
import {UploadOption} from '@/app/lib/upload/UploadOption';
import ServerAddress from '@/app/com/main/module/business/server/bean/ServerAddress';

export default abstract class AbstractUploader extends AbstractMaterial {

    private uploadTool: UploadTool = new UploadTool();

    public upload(
        file: File,
        back: (success: boolean, uploadResult: UploadResult, message?: string) => void,
        progress?: (percent: number) => void): void {
        const key = '1.png';
        const map: Map<string, File> = new Map<string, File>();
        map.set(key, file);

        this.uploads(
            map,
            (success: boolean, rm: Map<string, UploadResult>, message?: string) => {
                const ur: any = rm.get(key);
                back(success, ur, message);
            },
            (percentMap: Map<string, number>) => {
                let percent = percentMap.get(key);
                if (!percent) {
                    percent = 0;
                }
                if (typeof progress === 'function') {
                    progress(percent);
                }
            });
    }

    public uploads(
        fileMap: Map<string, File>,
        back: (success: boolean, map: Map<string, UploadResult>, message?: string) => void,
        progress?: (percentMap: Map<string, number>) => void): void {

        if (fileMap && fileMap.size > 0) {
            const resultMap: Map<string, UploadResult> = new Map<string, UploadResult>();

            const address = this.getServerAddress();
            const path = this.getPath();
            if (!address || !address.enabled) {
                const serverName = this.getServerName();
                back(false, resultMap, '没有可用的' + serverName + '！');
            } else {
                const http = address.address + path;
                const keys = fileMap.keys();
                const percentMap: Map<string, number> = new Map<string, number>();

                for (const key of keys) {
                    const file = fileMap.get(key);

                    if (file) {
                        const o: UploadOption = new UploadOption(
                            (result: any, f: File | null) => {
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
                            }, (e: ProgressEvent, f: File | null) => {
                                let percent = 0;
                                if (e.total > 0) {
                                    percent = e.loaded / e.total * 100;
                                }
                                percentMap.set(key, percent);
                                if (typeof progress === 'function') {
                                    progress(percentMap);
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

    public abstract getServerAddress(): ServerAddress | null;

    public abstract getPath(): string;

    public abstract getServerName(): string;
}
