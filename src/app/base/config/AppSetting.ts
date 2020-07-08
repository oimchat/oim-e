export default class AppSetting {
    public static SERVER_URL: string = 'http://127.0.0.1:10000';

    public static setServerUrl(url: string): void {
        AppSetting.SERVER_URL = url;
    }
}
