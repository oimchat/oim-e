import app from '@/app/App';
import AllMessageUnreadBox from '@/app/com/main/box/AllMessageUnreadBox';
import DataChange from '@/app/base/event/DataChange';
import systemTrayBlinkDetection from '@/platform/SystemTrayBlinkDetection';
import WebImageFileHandler from '@/app/define/file/WebImageFileHandler';
import Item from '@/app/com/data/chat/content/Item';
import ImagePathFile from '@/platform/util/ImagePathFile';
import VoicePromptUserSetting from '@/app/com/main/setting/prompt/VoicePromptUserSetting';
import VoicePromptGroupSetting from '@/app/com/main/setting/prompt/VoicePromptGroupSetting';
import VoicePromptType from '@/app/com/main/setting/prompt/type/VoicePromptType';
import MessageAppendUserSetting from '@/app/com/main/setting/message/MessageAppendUserSetting';
import MessageAppendGroupSetting from '@/app/com/main/setting/message/MessageAppendGroupSetting';
import MessageAppendType from '@/app/com/main/setting/message/type/MessageAppendType';

class PlatformInitialize {
    private change: DataChange<number> = new class implements DataChange<number> {
        public change(count: number): void {
            if (count > 0) {
                systemTrayBlinkDetection.setBlink(true);
            } else {
                systemTrayBlinkDetection.setBlink(false);
            }
        }
    };

    public constructor() {
        // this.initializeView();
    }

    public initialize(): void {
        this.initializeUnread();
        this.initializeComponent();
    }

    private initializeUnread() {
        // tslint:disable-next-line:max-classes-per-file new-parens
        const allMessageUnreadBox: AllMessageUnreadBox = app.appContext.getMaterial(AllMessageUnreadBox);
        allMessageUnreadBox.addChangeEvent(this.change);
    }

    private initializeComponent() {

        const webImageFileHandler: WebImageFileHandler = {
            handleItems(items: Item[], back: (map: Map<string, File>) => void): void {
                ImagePathFile.handleFileImageItems(items, back);
            },
        } as WebImageFileHandler;

        app.appContext.putObject(WebImageFileHandler.name, webImageFileHandler);

        const userVoicePromptSetting: VoicePromptUserSetting = app.appContext.getMaterial(VoicePromptUserSetting);
        const groupVoicePromptSetting: VoicePromptGroupSetting = app.appContext.getMaterial(VoicePromptGroupSetting);

        userVoicePromptSetting.setDefaultType(VoicePromptType.always);
        groupVoicePromptSetting.setDefaultType(VoicePromptType.always);

        const messageAppendUserSetting: MessageAppendUserSetting = app.appContext.getMaterial(MessageAppendUserSetting);
        const messageAppendGroupSetting: MessageAppendGroupSetting = app.appContext.getMaterial(MessageAppendGroupSetting);

        messageAppendUserSetting.setDefaultType(MessageAppendType.bottom);
        messageAppendGroupSetting.setDefaultType(MessageAppendType.bottom);
    }
}

export default new PlatformInitialize();
