import {ipcRenderer} from 'electron';

export default class RenderDialogHandler {

    public constructor() {
        this.initializeEvent();
    }

    public save(fileName: string): string {
        const v = ipcRenderer.sendSync('dialog.sync.save.directory', fileName);
        return v;
        // console.log(v);
        // ipcRenderer.send('dialog.open.directory');
    }

    private initializeEvent(): void {
        // ipcRenderer.on('dialog.select.directory', (e, path) => {
        //     console.log(path);
        // });
    }
}