import {app, protocol, ipcMain, Tray, Menu, BrowserWindow, NativeImage, nativeImage} from 'electron';
import path from 'path';

export default class SystemTray {

    private isDevelopment: boolean = process.env.NODE_ENV !== 'production';
    private readonly basePath: string = path.join(__dirname, '/');
    private readonly icon: string = 'assets/images/logo/tray/tray.png';
    private tray: Tray;
    private mainWindow: BrowserWindow | null = null;
    private isBlink: boolean = false;
    private intervalTime: any = 0;
    private showIcon: NativeImage = nativeImage.createFromPath('');
    private emptyIcon: NativeImage = nativeImage.createFromPath('');
    private isShowTempImage: boolean = false;
    private isShowTrayImage: boolean = true;

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
        const showPath = path.join(this.basePath, this.icon);
        this.setShowIconPath(showPath);

        this.tray = new Tray(this.showIcon);
        this.initialize();
        this.initializeEvent();
        this.initializeHandle();
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

    private initializeEvent(): void {
        ipcMain.on('systemTray.setBlink', (e, isBlink) => {
            this.setIsBlink(isBlink);
        });
    }

    private initializeHandle() {
        const h = () => {
            this.handle();
        };
        this.intervalTime = setInterval(h, 500);
    }

    private setTitle(title: string) {
        this.tray.setTitle(title + '');
    }

    private setShowIconPath(iconPath: string) {
        this.showIcon = nativeImage.createFromPath(iconPath);
    }

    private setIsBlink(isBlink: boolean) {
        this.isBlink = isBlink;
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

    private handle(): void {
        if (this.isBlink) {
            if (this.isShowTempImage) {
                this.isShowTempImage = false;
                this.tray.setImage(this.showIcon);
            } else {
                this.isShowTempImage = true;
                this.tray.setImage(this.emptyIcon);
            }
            this.isShowTrayImage = false;
        } else {
            if (!this.isShowTrayImage) {
                this.isShowTrayImage = true;
                this.tray.setImage(this.showIcon);
            }
        }
    }
}
