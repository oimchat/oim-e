'use strict';

import {app, protocol, BrowserWindow} from 'electron';
import {
    createProtocol,
    /* installVueDevtools */
} from 'vue-cli-plugin-electron-builder/lib';
import BrowserWindowBuilder from '@/platform/e/window/BrowserWindowBuilder';
import SystemTray from '@/platform/e/SystemTray';
import MainHandle from '@/platform/e/MainHandle';

const isDevelopment = process.env.NODE_ENV !== 'production';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow | null;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{scheme: 'app', privileges: {secure: true, standard: true}}]);
// 单应用启动
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    // @ts-ignore
    if (win) {
        if (win.isMinimized()) {
            win.restore();
        }
        win.show();
        win.focus();
    }
    app.quit();
}

let tray: SystemTray | null = null;
let mainHandle: MainHandle | null = null;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
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


    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
        if (!process.env.IS_TEST) {
            win.webContents.openDevTools();
        }
    } else {
        createProtocol('app');
        // Load the index.html when not in development
        win.loadURL('app://./index.html');
    }

    // win.on('ready-to-show', () => {
    //     if (win) {
    //         win.show(); // 初始化后再显示
    //     }
    // });

    win.on('closed', () => {
        win = null;
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

    win.on('closed', () => {
        win = null;
    });

    if (!tray) {
        tray = new SystemTray();
    }
    mainHandle = new MainHandle(win);
    tray.setMainWindow(win);
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        // Devtools extensions are broken in Electron 6.0.0 and greater
        // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
        // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
        // If you are not using Windows 10 dark mode, you may uncomment these lines
        // In addition, if the linked issue is closed, you can upgrade e and uncomment these lines
        // try {
        //   await installVueDevtools()
        // } catch (e) {
        //   console.error('Vue Devtools failed to install:', e.toString())
        // }

    }
    createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                app.quit();
            }
        });
    } else {
        process.on('SIGTERM', () => {
            app.quit();
        });
    }
}