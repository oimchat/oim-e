export default class AppSetting {
    public static SERVER_URL: string = 'http://47.106.100.176:12000';

    public static setServerUrl(url: string): void {
        AppSetting.SERVER_URL = url;
    }
}
