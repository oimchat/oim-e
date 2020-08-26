import FileDownload from '@/app/define/file/FileDownload';
import FileProgressInfo from '@/app/com/client/module/file/FileProgressInfo';
import RenderDialogHandler from '@/platform/e/render/RenderDialogHandler';
import NodeFileDownload from '@/platform/e/util/NodeFileDownload';
import ByteSizeUtil from '@/app/common/util/ByteSizeUtil';
import Prompter from '@/app/com/client/component/Prompter';

export default class ElectronFileDownloadImpl extends FileDownload {

    private renderDialogHandler: RenderDialogHandler = new RenderDialogHandler();
    private nodeFileDownload: NodeFileDownload = new NodeFileDownload();

    public download(url: string, fileName: string, size: number, fileDownloadingInfo: FileProgressInfo, onProgress?: (total: number, loaded: number) => void, onSpeed?: (size: number, millisecond: number) => void): void {
        const own = this;
        // OpenFolderUtil.openFolder();
        // ElectronFolderOpenUtil.open();
        const path = this.renderDialogHandler.save(fileName);
        if (path) {
            own.nodeFileDownload.downloadFile(url, path,
                () => {
                    // no
                    fileDownloadingInfo.working = false;
                    fileDownloadingInfo.percentage = 100;
                },
                () => {
                    fileDownloadingInfo.show = false;
                    const prompter: Prompter = this.appContext.getMaterial(Prompter);
                    prompter.error('下载失败！');
                },
                (total: number, loaded: number) => {
                    fileDownloadingInfo.show = true;
                    fileDownloadingInfo.working = true;
                    fileDownloadingInfo.percentage = ByteSizeUtil.getPercentageIntegerRate(total, loaded);
                },
                (speedSize: number, millisecond: number) => {
                    // no
                    fileDownloadingInfo.speedText = ByteSizeUtil.getSpeedTextBySecond(speedSize, millisecond);
                });
            // console.log(path);
        }
    }
}
