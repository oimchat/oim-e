import {dialog, OpenDialogOptions, SaveDialogSyncOptions} from 'electron';

export default class ElectronFolderOpenUtil {
    public static syncOpen(): (string[]) | (undefined) {
        const options = {
            title: '打开文件',
            defaultPath: '',
            buttonLabel: '打开',
            filters: [
                {name: 'All Files', extensions: ['*']},
            ],
            properties: ['openFile'],
        } as OpenDialogOptions;
        return dialog.showOpenDialogSync(options);
        // let files = dialog.showOpenDialogSync(options);
    }

    public static syncSave(fileName: string): (string) | (undefined) {
        const options = {
            title: '保存文件',
            defaultPath: fileName || '',
        } as SaveDialogSyncOptions;
        return dialog.showSaveDialogSync(options);
        // let files = dialog.showOpenDialogSync(options);
    }
}
