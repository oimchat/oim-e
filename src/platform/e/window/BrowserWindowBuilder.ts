import {app, protocol, BrowserWindow} from 'electron';
import MainHandle from '@/platform/e/MainHandle';

export default class BrowserWindowBuilder {

    public static createWindow(): BrowserWindow {


        // Create the browser window.
        // win = new BrowserWindow({
        //     width: 800, height: 600,
        //     // show: false, // 先隐藏
        //     webPreferences: {
        //         nodeIntegration: true,
        //         webSecurity: false,
        //     },
        // });

        const win: BrowserWindow = new BrowserWindow({
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
            },
        });


        // win.on('ready-to-show', () => {
        //     if (win) {
        //         win.show(); // 初始化后再显示
        //     }
        // });

        win.on('closed', () => {
            // no
        });

        win.on('maximize', () => {
            if (win) {
                win.webContents.send('windowMaximize');
            }
        });
        win.on('unmaximize', () => {
            if (win) {
                win.webContents.send('windowUnmaximize');
            }
        });

        win.on('minimize', () => {
            if (win) {
                win.webContents.send('windowMinimize');
            }
        });

        win.on('restore', () => {
            if (win) {
                win.webContents.send('windowRestore');
            }
        });
        return win;
    }
}
