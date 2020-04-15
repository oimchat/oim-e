import AppContext from '@/app/base/AppContext';
import Prompt from '@/component/common/Prompt';
import ConnectHandler from '@/app/base/net/ConnectHandler';
import PromptHandler from '@/app/base/PromptHandler';
import auth from '@/app/common/auth/Auth';

import SystemNetController from '@/app/com/main/controller/SystemNetController';
import LoginController from '@/app/com/main/controller/LoginController';

import AppSettingManager from '@/app/com/main/manager/AppSettingManager';
import ServerService from '@/app/com/main/service/ServerService';
import DataPrompt from '@/app/base/DataPrompt';

import ContactAction from '@/app/com/main/action/ContactAction';
import ContactCategoryAction from '@/app/com/main/action/ContactCategoryAction';
import ContactRelationAction from '@/app/com/main/action/ContactRelationAction';
import GroupBusinessAction from '@/app/com/main/action/GroupBusinessAction';
import GroupCategoryAction from '@/app/com/main/action/GroupCategoryAction';
import GroupChatAction from '@/app/com/main/action/GroupChatAction';
import GroupInfoAction from '@/app/com/main/action/GroupInfoAction';
import GroupInviteAction from '@/app/com/main/action/GroupInviteAction';
import GroupJoinAction from '@/app/com/main/action/GroupJoinAction';
import GroupMemberAction from '@/app/com/main/action/GroupMemberAction';
import GroupRelationAction from '@/app/com/main/action/GroupRelationAction';
import PersonalAction from '@/app/com/main/action/PersonalAction';
import UserAction from '@/app/com/main/action/UserAction';
import UserChatAction from '@/app/com/main/action/UserChatAction';
import SystemAuthAction from '@/app/com/main/action/SystemAuthAction';


class App {

    public appContext: AppContext = new AppContext();
    public disconnection = false;

    constructor() {
        this.initialize();
        this.initializeConfig();
        this.initializeAction();
    }

    public logout(): void {
        auth.setLogin(false);
        auth.setToken('');
        this.appContext.netServer.setSocketHost('');
        this.appContext.netServer.closeNetSocket();
        this.appContext = new AppContext();
        this.initialize();
        this.initializeConfig();
        this.initializeAction();
    }

    private initialize(): void {
        const own = this;
        this.appContext.setPromptHandler({
            prompt(message: string, title?: string, type?: string): void {
                Prompt.notice(message, title, type);
            },
        } as PromptHandler);
        this.appContext.setDataPrompt({
            prompt(data: any): void {
                if (data.info) {
                    Prompt.message(data.info, '', '消息异常！');
                }
            },
        } as DataPrompt);
        const connectHandler: ConnectHandler = {
            onIdle(): void {
                // TODO
                if (auth.isLogin()) {
                    const snc: SystemNetController = own.appContext.getMaterial(SystemNetController);
                    snc.heartbeat();
                }
            },
            onBreak(): void {
                // TODO
                const lc: LoginController = own.appContext.getMaterial(LoginController);
                lc.reconnect();
            },
            onConnectStatusChange(isConnected: boolean): void {
                // TODO
                if (auth.isLogin()) {
                    own.disconnection = !isConnected;
                } else {
                    own.disconnection = false;
                }
                if (!isConnected && auth.isLogin()) {
                    own.appContext.prompt('网络已断开！');
                }
            },
            onError(): void {
                // TODO
            },
            onClose(): void {
                // TODO
            },
            onOpen(): void {
                // TODO
                const lc: LoginController = own.appContext.getMaterial(LoginController);
                lc.reAuth();
            },
        } as ConnectHandler;
        this.appContext.netServer.setConnectHandler(connectHandler);
    }

    private initializeConfig() {
        const own = this;
        const asm: AppSettingManager = this.appContext.getMaterial(AppSettingManager);
        asm.loadSetting();

        const addressBack = (success: boolean, message?: string) => {
            if (!success) {
                own.appContext.prompt('获取服务器地址失败！请检查网络是否正常');
            }
        };
        const serverService: ServerService = this.appContext.getMaterial(ServerService);
        serverService.loadServerAddress(addressBack);
    }

    private initializeAction(): void {
        this.appContext.putAction(ContactAction);
        this.appContext.putAction(ContactCategoryAction);
        this.appContext.putAction(ContactRelationAction);
        this.appContext.putAction(GroupBusinessAction);
        this.appContext.putAction(GroupCategoryAction);
        this.appContext.putAction(GroupChatAction);
        this.appContext.putAction(GroupInfoAction);
        this.appContext.putAction(GroupInviteAction);
        this.appContext.putAction(GroupJoinAction);
        this.appContext.putAction(GroupMemberAction);
        this.appContext.putAction(GroupRelationAction);
        this.appContext.putAction(PersonalAction);
        this.appContext.putAction(UserAction);
        this.appContext.putAction(UserChatAction);
        this.appContext.putAction(SystemAuthAction);
    }
}

export default new App();
