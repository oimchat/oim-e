import app from '@/app/App';
import AllMessageUnreadBox from '@/app/com/main/box/unread/AllMessageUnreadBox';
import DataChange from '@/app/base/event/DataChange';
import systemTrayBlinkDetection from '@/platform/e/SystemTrayBlinkDetection';
import ImageItemFileConverter from '@/app/define/file/ImageItemFileConverter';
import Item from '@/app/com/data/chat/content/Item';
import ImagePathFile from '@/platform/e/util/ImagePathFile';
import VoicePromptUserSetting from '@/app/com/main/setting/prompt/VoicePromptUserSetting';
import VoicePromptGroupSetting from '@/app/com/main/setting/prompt/VoicePromptGroupSetting';
import VoicePromptType from '@/app/com/main/setting/prompt/type/VoicePromptType';
import MessageAppendUserSetting from '@/app/com/main/setting/message/MessageAppendUserSetting';
import MessageAppendGroupSetting from '@/app/com/main/setting/message/MessageAppendGroupSetting';
import MessageAppendType from '@/app/com/main/setting/message/type/MessageAppendType';
import AppData from '@/app/base/config/AppData';
import appInfo from '@/platform/common/config/AppInfo';
import MessageSwitchSetting from '@/app/com/main/setting/message/MessageSwitchSetting';
import AppSettingManager from '@/app/com/main/manager/AppSettingManager';
import MessageTimeSettingStore from '@/app/com/main/setting/message/MessageTimeSettingStore';
import LoginController from '@/app/com/main/controller/LoginController';
import GroupChatManager from '@/app/com/main/manager/GroupChatManager';
import User from '@/app/com/bean/User';
import UserChatManager from '@/app/com/main/manager/UserChatManager';
import InitializeConverge from '@/app/com/main/converge/InitializeConverge';
import groupChatViewModel from '@/impl/data/GroupChatViewModel';
import userChatViewModel from '@/impl/data/UserChatViewModel';
import appInitialize from '@/impl/initialize/AppInitialize';


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
        this.loadConfig();
    }

    public loadConfig() {
        AppData.APP_NAME = appInfo.name;
        AppData.APP_VERSION = appInfo.version;
        AppData.APP_BUILD = appInfo.build;
        AppData.APP_TYPE = appInfo.type;
        AppData.APP_PLATFORM = appInfo.platform;

        AppData.API_VERSION = appInfo.serverVersion;


        const asm: AppSettingManager = app.appContext.getMaterial(AppSettingManager);
        asm.setDefaultServerUrlGetter(() => {
            return appInfo.serverUrl;
        });
        asm.loadSetting();
    }

    public initialize(): void {
        appInitialize.initialize();
        this.loadConfig();
        this.initializeUnread();
        this.initializeComponent();
    }

    private initializeUnread() {
        // tslint:disable-next-line:max-classes-per-file new-parens
        const allMessageUnreadBox: AllMessageUnreadBox = app.appContext.getMaterial(AllMessageUnreadBox);
        allMessageUnreadBox.addChangeEvent(this.change);
    }

    private initializeComponent() {

        const webImageFileHandler: ImageItemFileConverter = {
            handleItems(items: Item[], back: (map: Map<string, File>) => void): void {
                ImagePathFile.handleFileImageItems(items, back);
            },
        } as ImageItemFileConverter;

        app.appContext.putObject(ImageItemFileConverter.name, webImageFileHandler);

        const userVoicePromptSetting: VoicePromptUserSetting = app.appContext.getMaterial(VoicePromptUserSetting);
        const groupVoicePromptSetting: VoicePromptGroupSetting = app.appContext.getMaterial(VoicePromptGroupSetting);

        userVoicePromptSetting.setDefaultType(VoicePromptType.always);
        groupVoicePromptSetting.setDefaultType(VoicePromptType.always);

        const messageAppendUserSetting: MessageAppendUserSetting = app.appContext.getMaterial(MessageAppendUserSetting);
        const messageAppendGroupSetting: MessageAppendGroupSetting = app.appContext.getMaterial(MessageAppendGroupSetting);

        messageAppendUserSetting.setDefaultType(MessageAppendType.bottom);
        messageAppendGroupSetting.setDefaultType(MessageAppendType.bottom);

        const messageSwitchSetting: MessageSwitchSetting = app.appContext.getMaterial(MessageSwitchSetting);
        messageSwitchSetting.setSwitchType(MessageAppendType.bottom);

        const messageTimeSettingStore: MessageTimeSettingStore = app.appContext.getMaterial(MessageTimeSettingStore);
        messageTimeSettingStore.messageTimeSetting.mergeMillisecond = -1;

        const loginController: LoginController = app.appContext.getMaterial(LoginController);
        loginController.onReconnect = () => {
            const groupChatManager: GroupChatManager = app.appContext.getMaterial(GroupChatManager);
            const userChatManager: UserChatManager = app.appContext.getMaterial(UserChatManager);

            groupChatManager.clear();
            userChatManager.clear();

            groupChatViewModel.clear();
            userChatViewModel.clear();

            const initializeConverge: InitializeConverge = app.appContext.getMaterial(InitializeConverge);
            initializeConverge.loadUnreadList();
        };
    }
}

export default new PlatformInitialize();
