import {shell, ipcRenderer, remote} from 'electron';

class SystemTrayBlinkDetection {

    public setBlink(blink: boolean): void {
        ipcRenderer.send('systemTray.setBlink', blink);
    }
}

export default new SystemTrayBlinkDetection();
