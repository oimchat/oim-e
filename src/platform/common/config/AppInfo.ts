import Platform from '@/app/common/util/Platform';
import EnvConfig from '@/config/EnvConfig';

class AppInfo {
    public logoInfo: {
        logo16: string,
        logo24: string,
        logo32: string,
        logo48: string,
        logo64: string,
        logo128: string,
        logo512: string,
    } = {
        logo16: 'assets/general/common/logo/logo_16.png',
        logo24: 'assets/general/common/logo/logo_24.png',
        logo32: 'assets/general/common/logo/logo_32.png',
        logo48: 'assets/general/common/logo/logo_48.png',
        logo64: 'assets/general/common/logo/logo_64.png',
        logo128: 'assets/general/common/logo/logo_128.png',
        logo512: 'assets/general/common/logo/logo_512.png',
    };

    public name: string = 'OIM-Web';
    public version: string = '1.0.0';
    public build: number = 1;
    public platform: string = Platform.getName();
    /**
     * type:客户端类型<br>
     * 1:oim-fx(javafx客户端)<br>
     * 2:oim-e(electron客户端)<br>
     * 3:h5-web<br>
     * 4:android<br>
     * 5:ios<br>
     * 6:h5-app<br>
     * 7:h5-wap<br>
     */
    public type: string = '3';

    public serverVersion: string = '1';
    public serverUrl = EnvConfig.getBaseUrl();
}

const appInfo: AppInfo = new AppInfo();
export default appInfo;
