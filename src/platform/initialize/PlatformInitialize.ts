import app from '@/app/App';
import AllMessageUnreadBox from '@/app/com/main/box/AllMessageUnreadBox';
import DataChange from '@/app/base/event/DataChange';
import systemTrayBlinkDetection from '@/platform/SystemTrayBlinkDetection';
import WebImageFileHandler from '@/app/define/file/WebImageFileHandler';
import Item from '@/app/com/data/chat/content/Item';
import ImagePathFile from '@/platform/util/ImagePathFile';

class PlatformInitialize {

    public constructor() {
        // this.initializeView();
    }

    public initialize(): void {
        this.initializeUnread();
        this.initializeComponent();
    }

    private initializeUnread() {
        // tslint:disable-next-line:max-classes-per-file new-parens
        const change: DataChange<number> = new class implements DataChange<number> {
            public change(count: number): void {
                if (count > 0) {
                    systemTrayBlinkDetection.setBlink(true);
                } else {
                    systemTrayBlinkDetection.setBlink(false);
                }
            }
        };
        const allMessageUnreadBox: AllMessageUnreadBox = app.appContext.getMaterial(AllMessageUnreadBox);
        allMessageUnreadBox.addChangeEvent(change);
    }

    private initializeComponent() {

        const webImageFileHandler: WebImageFileHandler = {
            handleItems(items: Item[], back: (map: Map<string, File>) => void): void {
                ImagePathFile.handleFileImageItems(items, back);
            },
        } as WebImageFileHandler;

        app.appContext.putObject(WebImageFileHandler.name, webImageFileHandler);
    }
}

export default new PlatformInitialize();
