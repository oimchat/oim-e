export default class AppSetting {
    public static SERVER_URL: string = 'http://10.32.1.150:10000';

    public static setServerUrl(url: string): void {
        AppSetting.SERVER_URL = url;
    }
}
