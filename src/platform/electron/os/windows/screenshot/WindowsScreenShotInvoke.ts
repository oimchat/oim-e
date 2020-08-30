import screenShot from '@/platform/electron/os/windows/screenshot/WindowsScreenShot';
import path from 'path';

class WindowsScreenShotInvoke {
    private basePath: string = path.join(__dirname, '/');

    public shot(back: (file: File) => void): void {
        screenShot.shot(back).then((r) => {
            // no
        });
        // ipcRenderer.send('screenShot.shot');
    }

    public getPath(): string {
        return this.basePath;
    }
}

export default new WindowsScreenShotInvoke();
