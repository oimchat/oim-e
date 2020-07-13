import {shell, ipcRenderer, remote} from 'electron';
import screenShot from '@/platform/module/ScreenShot';
import path from 'path';

class ScreenShotInvoke {
    private basePath: string = path.join(__dirname, '/');

    public shot(back: (file: File) => void): void {
        screenShot.shot(back);
        // ipcRenderer.send('screenShot.shot');
    }

    public getPath(): string {
        return this.basePath;
    }
}

export default new ScreenShotInvoke();
