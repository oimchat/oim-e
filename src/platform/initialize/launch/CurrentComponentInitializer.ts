import Initializer from '@/app/base/initialize/Initializer';
import app from '@/app/App';
import VoicePromptUserSetting from '@/app/com/main/module/setting/prompt/VoicePromptUserSetting';
import VoicePromptGroupSetting from '@/app/com/main/module/setting/prompt/VoicePromptGroupSetting';
import VoicePromptType from '@/app/com/main/module/setting/prompt/type/VoicePromptType';
import MessageAppendUserSetting from '@/app/com/main/module/setting/message/MessageAppendUserSetting';
import MessageAppendGroupSetting from '@/app/com/main/module/setting/message/MessageAppendGroupSetting';
import MessageAppendType from '@/app/com/main/module/setting/message/type/MessageAppendType';
import MessageSwitchSetting from '@/app/com/main/module/setting/message/MessageSwitchSetting';
import MessageTimeSettingStore from '@/app/com/main/module/setting/message/MessageTimeSettingStore';
import LoginController from '@/app/com/main/module/business/index/controller/LoginController';
import GroupChatManager from '@/app/com/main/module/business/chat/manager/GroupChatManager';
import UserChatManager from '@/app/com/main/module/business/chat/manager/UserChatManager';
import groupChatViewModel from '@/platform/vue/view/model/GroupChatViewModel';
import userChatViewModel from '@/platform/vue/view/model/UserChatViewModel';
import InitializeConverge from '@/app/com/main/module/business/index/converge/InitializeConverge';
import AppContext from '@/app/base/context/AppContext';
import ImageItemFileConverter from '@/app/define/file/ImageItemFileConverter';
import LoginSaveBox from '@/app/com/main/module/business/index/box/login/LoginSaveBox';

export default class CurrentComponentInitializer implements Initializer {

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

        const loginSaveBox: LoginSaveBox = app.appContext.getMaterial(LoginSaveBox);
        loginSaveBox.loginSaveSupport = true;

        // const userVoicePromptSetting: VoicePromptUserSetting = app.appContext.getMaterial(VoicePromptUserSetting);
        // const groupVoicePromptSetting: VoicePromptGroupSetting = app.appContext.getMaterial(VoicePromptGroupSetting);
        //
        // userVoicePromptSetting.setDefaultType(VoicePromptType.always);
        // groupVoicePromptSetting.setDefaultType(VoicePromptType.always);
        //
        // const messageAppendUserSetting: MessageAppendUserSetting = app.appContext.getMaterial(MessageAppendUserSetting);
        // const messageAppendGroupSetting: MessageAppendGroupSetting = app.appContext.getMaterial(MessageAppendGroupSetting);
        //
        // messageAppendUserSetting.setDefaultType(MessageAppendType.bottom);
        // messageAppendGroupSetting.setDefaultType(MessageAppendType.bottom);
        //
        // const messageSwitchSetting: MessageSwitchSetting = app.appContext.getMaterial(MessageSwitchSetting);
        // messageSwitchSetting.setSwitchType(MessageAppendType.bottom);
        //
        // const messageTimeSettingStore: MessageTimeSettingStore = app.appContext.getMaterial(MessageTimeSettingStore);
        // messageTimeSettingStore.messageTimeSetting.mergeMillisecond = -1;

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
