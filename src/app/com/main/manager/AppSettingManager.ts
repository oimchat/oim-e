import AbstractMaterial from '@/app/base/AbstractMaterial';
import AppSetting from '@/app/base/config/AppSetting';
import BaseCache from '@/app/common/cache/BaseCache';
import http from '@/app/lib/http/HttpClient';

export default class AppSettingManager extends AbstractMaterial {

    private cache: BaseCache = new BaseCache('appSettingCache');
    private serverUrlKey = 'serverUrlKey';

    public loadSetting() {
        const url = this.cache.get(this.serverUrlKey);
        if (url) {
            AppSetting.SERVER_URL = url;
            http.setBaseURL(url);
        }
    }

    public setServerUrl(url: string): void {
        AppSetting.SERVER_URL = url;
        this.cache.put(this.serverUrlKey, url);
        http.setBaseURL(url);
    }
}
