import AppContext from '@/app/base/context/AppContext';
import ConnectHandler from '@/app/base/net/ConnectHandler';
import auth from '@/app/common/auth/Auth';
import SystemNetController from '@/app/com/main/module/business/system/controller/SystemNetController';
import LoginController from '@/app/com/main/module/business/index/controller/LoginController';
import PromptHandler from '@/app/com/client/define/prompt/PromptHandler';
import LaunchInitializerBox from '@/app/base/initialize/LaunchInitializerBox';
import LaunchInitializer from '@/app/base/initialize/LaunchInitializer';
import DefaultPromptHandlerImpl from '@/app/impl/default/client/prompt/DefaultPromptHandlerImpl';
import EnterInitializerBox from '@/app/base/initialize/EnterInitializerBox';
import InformationInitializer from '@/app/com/main/initialize/impl/InformationInitializer';
import ViewInitializer from '@/app/com/main/initialize/impl/ViewInitializer';
import ListInitializer from '@/app/com/main/initialize/impl/ListInitializer';
import PersonalInitializer from '@/app/com/main/initialize/impl/PersonalInitializer';
import ActionInitializer from '@/app/initialize/ActionInitializer';
import HttpInitializer from '@/app/initialize/HttpInitializer';
import NetModule from '@/app/com/common/module/NetModule';
import Prompter from '@/app/com/client/component/Prompter';
import ServerInitializer from '@/app/initialize/ServerInitializer';
import ComponentInitializer from '@/app/initialize/ComponentInitializer';
import ListenerInitializer from '@/app/initialize/ListenerInitializer';
import DefaultViewBuilder from '@/app/impl/default/DefaultViewBuilder';
import LaunchOrder from '@/app/LaunchOrder';
import AppLoader from '@/app/AppLoader';


class App {

    public appContext: AppContext = new AppContext();
    public promptHandler: PromptHandler = new DefaultPromptHandlerImpl();
    public actionLoader: AppLoader = new AppLoader();
    public disconnection = false;

    constructor() {
        this.initializeApp();
        LaunchOrder.start(this, 'constructor');
    }

    public logout(): void {
        LaunchOrder.start(this, 'logout');
        this.clearAuth();
        this.closeNet();
        this.buildAppContext();
        this.initializeApp();
        this.initializeLaunch();
    }

    public initializeApp(): void {
        this.buildDefaultView();
        // this.actionLoader.load();
    }

    public initializeLaunch(): void {
        LaunchOrder.start(this, 'initialize');

        this.initializeNetServer();
        this.buildModule();
        this.buildLaunch();
        const launchInitializerBox = this.appContext.getMaterial(LaunchInitializerBox);
        launchInitializerBox.initialize();
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
                    own.prompt('网络已断开！');
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
        const netModule: NetModule = this.appContext.getMaterial(NetModule);
        netModule.netServer.setConnectHandler(connectHandler);
    }

    public prompt(message: string, title?: string, type?: string) {
        const prompter: Prompter = this.appContext.getMaterial(Prompter);
        prompter.prompt(message, title, type);
    }

    private clearAuth() {
        auth.clear();
    }

    private closeNet() {
        const netModule: NetModule = this.appContext.getMaterial(NetModule);
        netModule.netServer.setSocketHost('');
        netModule.netServer.closeNetSocket();
    }

    private buildAppContext() {
        this.appContext = new AppContext();
    }

    private buildDefaultView(): void {
        const builder = new DefaultViewBuilder(this.appContext);
    }

    private buildModule(): void {
        this.appContext.getMaterial(EnterInitializerBox);
        this.appContext.getMaterial(InformationInitializer);
        this.appContext.getMaterial(ListInitializer);
        this.appContext.getMaterial(PersonalInitializer);
        this.appContext.getMaterial(ViewInitializer);
    }

    private buildLaunch(): void {
        this.appContext.getMaterial(ActionInitializer);
        this.appContext.getMaterial(ComponentInitializer);
        this.appContext.getMaterial(HttpInitializer);
        this.appContext.getMaterial(ListenerInitializer);
        this.appContext.getMaterial(ServerInitializer);
    }

    private initializeNetServer(): void {
        const netModule: NetModule = this.appContext.getMaterial(NetModule);
        netModule.initializeNetServer();
    }
}

export default new App();
