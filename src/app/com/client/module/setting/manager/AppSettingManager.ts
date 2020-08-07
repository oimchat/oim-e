import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import AppSetting from '@/app/base/config/AppSetting';
import BaseCache from '@/app/common/cache/BaseCache';
import http from '@/app/lib/http/HttpClient';
import BaseUtil from '@/app/lib/util/BaseUtil';

export default class AppSettingManager extends AbstractMaterial {

    private cache: BaseCache = new BaseCache('appSettingCache');
    private serverUrlKey = 'serverUrlKey';
    private defaultServerUrlGetter: () => string = (() => {
        return '';
    });

    public hasCacheServerUrl(): boolean {
        let has = false;
        const url = this.cache.get(this.serverUrlKey);
        has = !!url;
        return has;
    }

    public loadSetting() {
        const url = this.getServerUrl();
        http.setBaseURL(url);
    }

    public setServerUrl(url: string): void {
        AppSetting.SERVER_URL = url;
        this.cache.put(this.serverUrlKey, url);
        http.setBaseURL(url);
    }

    public getServerUrl(): string {
        let url = AppSetting.SERVER_URL;
        const cacheUrl = this.cache.get(this.serverUrlKey);
        const defaultUrl = this.getDefaultServerUrl();
        if (BaseUtil.isNotEmpty(cacheUrl)) {
            url = cacheUrl;
        } else if (BaseUtil.isNotEmpty(defaultUrl)) {
            url = defaultUrl;
        }
        return url;
    }

    public setDefaultServerUrlGetter(getter: () => string) {
        this.defaultServerUrlGetter = getter;
    }

    public getDefaultServerUrl(): string {
        let url = '';
        if (typeof this.defaultServerUrlGetter === 'function') {
            url = this.defaultServerUrlGetter();
        }
        return url;
    }
}

