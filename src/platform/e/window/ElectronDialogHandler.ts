import {app, protocol, ipcMain, dialog, Tray, Menu, BrowserWindow, NativeImage, nativeImage} from 'electron';
import ElectronFolderOpenUtil from '@/platform/e/window/ElectronFolderOpenUtil';

export default class ElectronDialogHandler {

    public constructor() {
        this.initializeEvent();
    }

    private initializeEvent(): void {

        ipcMain.on('dialog.sync.save.directory', (event, fileName) => {
            const value = ElectronFolderOpenUtil.syncSave(fileName);
            event.returnValue = value;
            // event.sender.send('dialog.select.directory', 'c/user/name');
        });
    }
}
