export default class AppSetting {
    public static SERVER_URL: string = 'http://im.kudouyun.cn:10000';

    public static setServerUrl(url: string): void {
        AppSetting.SERVER_URL = url;
    }
}
