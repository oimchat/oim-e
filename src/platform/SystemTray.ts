import {app, protocol, ipcMain, Tray, Menu, BrowserWindow} from 'electron';
import path from 'path';

export default class SystemTray {
    private isDevelopment: boolean = process.env.NODE_ENV !== 'production';
    private readonly basePath: string = path.join(__dirname, '/');
    private readonly icon: string = 'assets/images/logo/tray/tray.png';
    private tray: Tray;
    private mainWindow: BrowserWindow | null = null;

    constructor(icon?: string) {
        if (icon) {
            this.icon = icon;
        }
        if (this.isDevelopment) {
            this.basePath = path.join(__dirname, '../public/');
        }
        if (process.platform === 'darwin') {
            this.icon = 'assets/images/logo/tray/mac.png';
        }
        this.tray = new Tray(path.join(this.basePath, this.icon));
        this.initialize();
    }

    public setMainWindow(mainWindow: BrowserWindow) {
        this.mainWindow = mainWindow;
    }

    private initialize(): void {
        const own = this;
        this.createContextMenu();
        this.tray.setToolTip('OIM');
        this.tray.on('click', () => {
            if (own.mainWindow) {
                own.mainWindow.show();
            }
        });
    }

    private setTitle(title: string) {
        this.tray.setTitle(title + '');
    }

    private setImage(iconPath: string) {
        this.tray.setImage(iconPath);
    }

    private setContextMenu() {
        // no
    }

    private createContextMenu() {
        const own = this;
        const trayMenu = Menu.buildFromTemplate([
            {
                label: '打开主面板',
                click() {
                    if (own.mainWindow) {
                        own.mainWindow.show();
                    }
                },
            },

            {
                type: 'separator',
            }, {
                label: '退出',
                click() {
                    BrowserWindow.getAllWindows().forEach((win) => {
                        win.removeAllListeners();
                    });
                    // app.quit()
                    app.exit(0);
                },
            }]);
        this.tray.setContextMenu(trayMenu);
    }
}
