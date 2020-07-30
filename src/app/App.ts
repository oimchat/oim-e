import AppContext from '@/app/base/context/AppContext';
import ConnectHandler from '@/app/base/net/ConnectHandler';
import auth from '@/app/common/auth/Auth';
import SystemNetController from '@/app/com/main/controller/SystemNetController';
import LoginController from '@/app/com/main/controller/LoginController';
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
import NetModule from '@/app/com/common/module/NetModule';


class App {

    public appContext: AppContext = new AppContext();
    public launchInitializerBox: InitializerBox = new InitializerBox();
    public disconnection = false;
    public promptHandler: PromptHandler = new PromptHandlerImpl();

    constructor() {
        // this.initializeApp();
    }

    public logout(): void {
        auth.setLogin(false);
        auth.setToken('');
        const netModule: NetModule = this.appContext.getMaterial(NetModule);
        netModule.netServer.setSocketHost('');
        netModule.netServer.closeNetSocket();

        this.appContext = new AppContext();
        this.initialize();
    }

    public putInitializer(data: Initializer) {
        this.launchInitializerBox.put(data);
    }

    public initialize(): void {
        this.buildModule();
        this.buildLaunch();
        this.launchInitializerBox.initialize(this.appContext);

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
        const netModule: NetModule = this.appContext.getMaterial(NetModule);
        netModule.netServer.setConnectHandler(connectHandler);
    }

    private buildModule(): void {
        this.appContext.getMaterial(EnterInitializerBox);
        this.appContext.getMaterial(InformationInitializer);
        this.appContext.getMaterial(ListInitializer);
        this.appContext.getMaterial(PersonalInitializer);
        this.appContext.getMaterial(ViewInitializer);
    }

    private buildLaunch(): void {
        this.putInitializer(new ActionInitializer());
        this.putInitializer(new HttpInitializer());
    }
}

export default new App();
