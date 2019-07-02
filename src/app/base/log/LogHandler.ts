export default class LogHandler {

    public static LEVEL_DEBUG = 'debug';
    public static LEVEL_INFO = 'info';
    public static LEVEL = 'info';

    public static debug(message: string, e?: any) {
        if (LogHandler.LEVEL === LogHandler.LEVEL_DEBUG) {
            console.log(message);
        }
    }
}
