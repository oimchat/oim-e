import app from '@/app/App';
import AllMessageUnreadBox from '@/app/com/main/box/unread/AllMessageUnreadBox';
import DataChange from '@/app/base/event/DataChange';
import systemTrayBlinkDetection from '@/platform/e/SystemTrayBlinkDetection';
import AppData from '@/app/base/config/AppData';
import appInfo from '@/platform/common/config/AppInfo';
import AppSettingManager from '@/app/com/main/manager/AppSettingManager';
import Platform from '@/app/common/util/Platform';
import AppInfo from '@/app/base/config/AppInfo';
import AppInitializer from '@/impl/initialize/AppInitializer';
import ComponentInitializer from '@/platform/initialize/launch/ComponentInitializer';
import routerManager from '@/router/RouterManager';
import auth from '@/app/common/auth/Auth';
import ActionInitializer from '@/app/initialize/ActionInitializer';
import HttpInitializer from '@/app/initialize/HttpInitializer';


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
        this.initializeRouter();
        this.initialize();
    }

    public loadConfig() {
        AppData.APP_NAME = appInfo.name;
        AppData.APP_VERSION = appInfo.version;
        AppData.APP_BUILD = appInfo.build;
        AppData.APP_TYPE = appInfo.type;
        AppData.APP_PLATFORM = appInfo.platform;

        AppData.API_VERSION = appInfo.serverVersion;

        const osName = Platform.getName();
        AppInfo.APP_PLATFORM = osName;

        const asm: AppSettingManager = app.appContext.getMaterial(AppSettingManager);
        asm.setDefaultServerUrlGetter(() => {
            return appInfo.serverUrl;
        });
        asm.loadSetting();
    }

    public initialize(): void {
        this.loadConfig();
        this.initializeUnread();
        this.initializeComponent();
        this.initializeApp();
    }

    private initializeUnread() {
        const allMessageUnreadBox: AllMessageUnreadBox = app.appContext.getMaterial(AllMessageUnreadBox);
        allMessageUnreadBox.addChangeEvent(this.change);
    }

    private initializeComponent() {
        app.putInitializer(new ActionInitializer());
        app.putInitializer(new HttpInitializer());
        app.putInitializer(new AppInitializer());
        app.putInitializer(new ComponentInitializer());
    }

    private initializeApp() {
        app.initialize();
    }

    private initializeRouter() {
        const routerSkips: string[] = ['login', 'register', 'resetPassword'];
        routerManager.setRouterAuth({
            isAuth(): boolean {
                return auth.isLogin();
            },
        });
        routerManager.setDefaultRouteName('login');
        routerManager.setSkips(routerSkips);
        routerManager.setIntercept(true);
    }
}

export default new PlatformInitialize();
