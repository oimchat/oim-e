import AppContext from '@/app/base/context/AppContext';
import ConnectHandler from '@/app/base/net/ConnectHandler';
import auth from '@/app/common/auth/Auth';
import SystemNetController from '@/app/com/main/controller/SystemNetController';
import LoginController from '@/app/com/main/controller/LoginController';

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
import UserChatDataAction from '@/app/com/main/action/UserChatDataAction';
import PromptHandler from '@/app/define/prompt/PromptHandler';
import InitializerBox from '@/app/base/initialize/InitializerBox';
import Initializer from '@/app/base/initialize/Initializer';
import PromptHandlerImpl from '@/app/impl/prompt/PromptHandlerImpl';
import EnterInitializerBox from '@/app/com/main/initialize/EnterInitializerBox';
import InformationInitializer from '@/app/com/main/initialize/impl/InformationInitializer';
import ViewInitializer from '@/app/com/main/initialize/impl/ViewInitializer';
import ListInitializer from '@/app/com/main/initialize/impl/ListInitializer';
import PersonalInitializer from '@/app/com/main/initialize/impl/PersonalInitializer';
import ActionInitializer from '@/app/initialize/ActionInitializer';
import HttpInitializer from '@/app/initialize/HttpInitializer';


class App {

    public appContext: AppContext = new AppContext();
    public launchInitializerBox: InitializerBox = new InitializerBox();


    public disconnection = false;
    public promptHandler: PromptHandler = new PromptHandlerImpl();

    constructor() {
        this.initialize();
    }

    public logout(): void {
        auth.setLogin(false);
        auth.setToken('');
        this.appContext.netServer.setSocketHost('');
        this.appContext.netServer.closeNetSocket();
        this.appContext = new AppContext();
        this.initialize();
    }

    public putInitializer(data: Initializer) {
        this.launchInitializerBox.put(data);
    }

    private initialize(): void {
        const own = this;

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

        this.initializeConfig();
        this.initializeModule();
    }

    private initializeLaunch() {
        this.putInitializer(new ActionInitializer());
        this.putInitializer(new HttpInitializer());
    }

    private initializeConfig() {
        // no
    }




    private initializeModule(): void {
        const appContext = this.appContext;

        this.appContext.getMaterial(EnterInitializerBox);
        this.appContext.getMaterial(InformationInitializer);
        this.appContext.getMaterial(ListInitializer);
        this.appContext.getMaterial(PersonalInitializer);
        this.appContext.getMaterial(ViewInitializer);
    }

}

export default new App();
