import Initializer from '@/app/base/initialize/Initializer';
import app from '@/app/App';
import AppContext from '@/app/base/context/AppContext';
import WriteExtendStore from '@/views/common/chat/extend/WriteExtendStore';
import Platform from '@/app/common/util/Platform';
import {WindowsScreenshotExtend} from '@/platform/electron/os/windows/screenshot/WindowsScreenshotExtend';
import WriteExtendType from '@/views/common/chat/extend/WriteExtendType';
import {MacScreenshotExtend} from '@/platform/electron/os/mac/screenshot/MacScreenshotExtend';
import DefineExtendStore from '@/app/define/extend/DefineExtendStore';
import FileDownloadDefineData from '@/app/com/client/module/file/FileDownloadDefineData';
import WebFileDownloadImpl from '@/platform/web/impl/WebFileDownloadImpl';
import ElectronFileDownloadImpl from '@/platform/electron/impl/ElectronFileDownloadImpl';

export default class CurrentPlatformInitializer implements Initializer {

    public getOrder(): number {
        return 0;
    }

    public getKey(): string {
        const own: object = this;
        return own.constructor.name;
    }

    public initialize(appContext: AppContext): void {
        this.initializeChat(appContext);
    }

    public initializeChat(appContext: AppContext) {
        if (Platform.isWindows()) {
            const writeExtendStore: WriteExtendStore = app.appContext.getMaterial(WriteExtendStore);
            writeExtendStore.put(WriteExtendType.screenshot, new WindowsScreenshotExtend());
        } else if (Platform.isMac()) {
            const writeExtendStore: WriteExtendStore = app.appContext.getMaterial(WriteExtendStore);
            writeExtendStore.put(WriteExtendType.screenshot, new MacScreenshotExtend());
        }

        const fileDownloadDefineData: FileDownloadDefineData = app.appContext.getMaterial(FileDownloadDefineData);
        const fileDownload: ElectronFileDownloadImpl = appContext.getMaterial(ElectronFileDownloadImpl);
        // const fileDownload: WebFileDownloadImpl = appContext.getMaterial(WebFileDownloadImpl);
        const defineExtendStore: DefineExtendStore = appContext.getMaterial(DefineExtendStore);
        defineExtendStore.put(fileDownloadDefineData.getKey(), fileDownload);
    }
}
