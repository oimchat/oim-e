import {app, protocol, BrowserWindow} from 'electron';
import BrowserWindowConstructorOptions = Electron.BrowserWindowConstructorOptions;
import BrowserWindowWarp from '@/platform/electron/window/BrowserWindowWarp';

export default class BrowserWindowBuilder {

    public static createOptionWindow(options?: BrowserWindowConstructorOptions): BrowserWindow {
        // Create the browser window.
        // win = new BrowserWindow({
        //     width: 800, height: 600,
        //     // show: false, // 先隐藏
        //     webPreferences: {
        //         nodeIntegration: true,
        //         webSecurity: false,
        //     },
        // });

        const win: BrowserWindow = new BrowserWindow(options);
        // win.on('ready-to-show', () => {
        //     if (win) {
        //         win.show(); // 初始化后再显示
        //     }
        // });
        const browserWindowWarp: BrowserWindowWarp = new BrowserWindowWarp();
        browserWindowWarp.initializeEvent(win);
        return win;
    }

    public static createDefaultWindow(): BrowserWindow {
        const options = {
            width: 1000,
            height: 600,
            minWidth: 500,
            minHeight: 460,
            // frame: isDevelopment,
            frame: false,
            transparent: true,
            webPreferences: {
                nodeIntegration: true,
                webSecurity: false,
                enableRemoteModule: true,
            },
        };
        return BrowserWindowBuilder.createOptionWindow(options);
    }
}
