import app from '@/app/App';
import LaunchInitializer from '@/app/base/initialize/LaunchInitializer';
import ImageItemFileConverter from '@/app/define/file/ImageItemFileConverter';
import Item from '@/app/com/common/chat/Item';
import AppContext from '@/app/base/context/AppContext';
import SoundHandlerEnum from '@/app/com/client/define/prompt/SoundHandlerEnum';
import WebSoundHandlerImpl from '@/common/web/impl/prompt/WebSoundHandlerImpl';
import WebImagePathFile from '@/common/web/util/WebImagePathFile';
import WorkViewEnum from '@/app/com/common/view/WorkViewEnum';

export default class WebComponentInitializer extends LaunchInitializer {

    public getOrder(): number {
        return 0;
    }

    public initialize(): void {
        this.initializeHttp(this.appContext);
    }

    public getKey(): string {
        const own: object = this;
        return own.constructor.name;
    }

    public initializeHttp(appContext: AppContext) {
        const webImageFileHandler: ImageItemFileConverter = {
            handleItems(items: Item[], back: (map: Map<string, File>) => void): void {
                WebImagePathFile.handleFileImageItems(items, back);
            },
        } as ImageItemFileConverter;

        app.appContext.putObject(ImageItemFileConverter.name, webImageFileHandler);
        app.appContext.putObject(SoundHandlerEnum.SoundHandler, new WebSoundHandlerImpl());
    }
}
