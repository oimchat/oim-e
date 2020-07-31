import Initializer from '@/app/base/initialize/Initializer';
import ImageItemFileConverter from '@/app/define/file/ImageItemFileConverter';
import Item from '@/app/com/data/chat/content/Item';
import ImagePathFile from '@/platform/e/util/ImagePathFile';
import app from '@/app/App';
import VoicePromptUserSetting from '@/app/com/main/setting/prompt/VoicePromptUserSetting';
import VoicePromptGroupSetting from '@/app/com/main/setting/prompt/VoicePromptGroupSetting';
import VoicePromptType from '@/app/com/main/setting/prompt/type/VoicePromptType';
import MessageAppendUserSetting from '@/app/com/main/setting/message/MessageAppendUserSetting';
import MessageAppendGroupSetting from '@/app/com/main/setting/message/MessageAppendGroupSetting';
import MessageAppendType from '@/app/com/main/setting/message/type/MessageAppendType';
import MessageSwitchSetting from '@/app/com/main/setting/message/MessageSwitchSetting';
import MessageTimeSettingStore from '@/app/com/main/setting/message/MessageTimeSettingStore';
import LoginController from '@/app/com/main/controller/LoginController';
import GroupChatManager from '@/app/com/main/manager/GroupChatManager';
import UserChatManager from '@/app/com/main/manager/UserChatManager';
import groupChatViewModel from '@/impl/data/GroupChatViewModel';
import userChatViewModel from '@/impl/data/UserChatViewModel';
import InitializeConverge from '@/app/com/main/converge/InitializeConverge';
import AppContext from '@/app/base/context/AppContext';
import SoundHandlerEnum from '@/app/define/prompt/SoundHandlerEnum';
import SoundHandlerImpl from '@/common/web/impl/prompt/SoundHandlerImpl';
import Prompter from '@/app/com/main/component/Prompter';

export default class ComponentInitializer implements Initializer {

    public getOrder(): number {
        return 0;
    }

    public getKey(): string {
        const own: object = this;
        return own.constructor.name;
    }

    public initialize(appContext: AppContext): void {
        this.initializeHttp(appContext);
    }

    public initializeHttp(appContext: AppContext) {
        const webImageFileHandler: ImageItemFileConverter = {
            handleItems(items: Item[], back: (map: Map<string, File>) => void): void {
                ImagePathFile.handleFileImageItems(items, back);
            },
        } as ImageItemFileConverter;

        app.appContext.putObject(ImageItemFileConverter.name, webImageFileHandler);
        app.appContext.putObject(SoundHandlerEnum.SoundHandler, new SoundHandlerImpl());

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
