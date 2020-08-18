import {app, protocol, BrowserWindow} from 'electron';

export default class BrowserWindowWarp {

    public initializeEvent(browserWindow: BrowserWindow) {
        browserWindow.addListener('closed', () => {
            // no
        });
        browserWindow.addListener('maximize', () => {
            if (browserWindow) {
                browserWindow.webContents.send('windowdowMaximize');
            }
        });
        browserWindow.addListener('unmaximize', () => {
            if (browserWindow) {
                browserWindow.webContents.send('windowdowUnmaximize');
            }
        });

        browserWindow.addListener('minimize', () => {
            if (browserWindow) {
                browserWindow.webContents.send('windowdowMinimize');
            }
        });

        browserWindow.addListener('restore', () => {
            if (browserWindow) {
                browserWindow.webContents.send('windowdowRestore');
            }
        });
    }
}
