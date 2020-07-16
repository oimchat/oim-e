import app from '@/app/App';
import AllMessageUnreadBox from '@/app/com/main/box/AllMessageUnreadBox';
import DataChange from '@/app/base/event/DataChange';
import systemTrayBlinkDetection from '@/platform/SystemTrayBlinkDetection';
import WebImageFileHandler from '@/app/define/file/WebImageFileHandler';
import Item from '@/app/com/data/chat/content/Item';
import ImagePathFile from '@/platform/util/ImagePathFile';
import UserVoicePromptSetting from '@/app/com/main/setting/UserVoicePromptSetting';
import Group from '@/app/com/bean/Group';
import GroupVoicePromptSetting from '@/app/com/main/setting/GroupVoicePromptSetting';
import VoicePromptType from '@/app/com/main/setting/type/VoicePromptType';

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

        const userVoicePromptSetting: UserVoicePromptSetting = app.appContext.getMaterial(UserVoicePromptSetting);
        const groupVoicePromptSetting: GroupVoicePromptSetting = app.appContext.getMaterial(GroupVoicePromptSetting);

        userVoicePromptSetting.setDefaultType(VoicePromptType.always);
        groupVoicePromptSetting.setDefaultType(VoicePromptType.always);
    }
}

export default new PlatformInitialize();
