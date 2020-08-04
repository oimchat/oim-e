import {app, remote, ipcRenderer, ipcMain, Tray, Menu, BrowserWindow} from 'electron';

export default class MainHandle {
    constructor(protected frame: BrowserWindow) {
        this.initialize();
    }

    private initialize() {
        const own = this;
        ipcMain.on('windowMin', () => this.frame.minimize());
        ipcMain.on('windowMax', () => {
            // if (this.frame.isMaximized()) {
            //     this.frame.unmaximize();
            // } else {
            //     this.frame.maximize();
            // }
            // own.frame.maximize();
            own.frame.setFullScreen(true);
        });

        ipcMain.on('windowRestore', () => {
            own.frame.setFullScreen(false);
            // own.frame.unmaximize();
            // if (this.frame.isMaximized()) {
            //
            // } else if (own.frame.isMinimized()) {
            //     own.frame.restore();
            // }
            //
            // if (!own.frame.isFullScreen()) {
            //     own.frame.setFullScreen(true)
            // } else {
            //     own.frame.setFullScreen(false)
            // }
        });
        // 只是隐藏任务栏
        ipcMain.on('windowClose', () => {
            own.frame.hide();
        });
    }

    private max() {
        const currentWindow = remote.getCurrentWindow();
        currentWindow.maximize();
    }

    private min() {
        const currentWindow = remote.getCurrentWindow();
        currentWindow.minimize();
    }

    private restore() {
        const currentWindow = remote.getCurrentWindow();
        if (currentWindow.isMaximized()) {
            currentWindow.unmaximize();
        } else if (currentWindow.isMinimized()) {
            currentWindow.restore();
        }
    }

    private close() {
        const currentWindow = remote.getCurrentWindow();
        currentWindow.close();
    }

    private bringFront(isOnTop: boolean) {
        const currentWindow = remote.getCurrentWindow();
        currentWindow.setAlwaysOnTop(isOnTop);
    }

    private focus() {
        const currentWindow = remote.getCurrentWindow();
        currentWindow.focus();
    }

    private isFocused() {
        const currentWindow = remote.getCurrentWindow();
        return currentWindow.isFocused();
    }

    private showInactive() {
        const currentWindow = remote.getCurrentWindow();
        currentWindow.showInactive();
    }

    private hide() {
        const currentWindow = remote.getCurrentWindow();
        currentWindow.hide();
    }

    private show() {
        const currentWindow = remote.getCurrentWindow();
        currentWindow.show();
    }
}
