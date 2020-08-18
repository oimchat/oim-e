import {shell, ipcRenderer, remote} from 'electron';

class WindowDecorated {
    public isMax: boolean = false;

    constructor() {
        this.init();
    }

    public init() {
        const own = this;
        ipcRenderer.on('windowMaximize', () => {
            own.isMax = true;
        });

        ipcRenderer.on('windowUnmaximize', () => {
            own.isMax = false;
        });

        ipcRenderer.on('windowMinimize', () => {
            own.isMax = false;
        });
    }

    public openURL(url: string) {
        shell.openExternal(url).then((r) => {
            // no
        });
    }

    public flashFrame() {
        ipcRenderer.send('flashFrame');
    }

    // public min() {
    //     ipcRenderer.send('windowMin');
    // }
    //
    // public max() {
    //     ipcRenderer.send('windowMax');
    // }
    //
    // public restore() {
    //     ipcRenderer.send('windowRestore');
    // }
    //
    // public close() {
    //     ipcRenderer.send('windowClose');
    // }

    public flashIcon() {
        ipcRenderer.send('flashIcon');
    }

    public clearFlashIcon() {
        ipcRenderer.send('clearFlashIcon');
    }

    public max() {
        const currentWindow = remote.getCurrentWindow();
        if (currentWindow) {
            // currentWindow.setFullScreen(true);
            currentWindow.maximize();
        }
    }

    public min() {
        const currentWindow = remote.getCurrentWindow();
        if (currentWindow) {
            currentWindow.minimize();
        }
    }

    public restore() {
        const currentWindow = remote.getCurrentWindow();
        if (currentWindow) {
            // currentWindow.setFullScreen(false);
            currentWindow.unmaximize();
        }
        // if (currentWindow.isMaximized()) {
        //     currentWindow.unmaximize();
        // } else if (currentWindow.isMinimized()) {
        //     currentWindow.restore();
        // }
    }

    public close() {
        const currentWindow = remote.getCurrentWindow();
        if (currentWindow) {
            currentWindow.close();
        }
    }

    public bringFront(isOnTop: boolean) {
        const currentWindow = remote.getCurrentWindow();
        if (currentWindow) {
            currentWindow.setAlwaysOnTop(isOnTop);
        }
    }

    public focus() {
        const currentWindow = remote.getCurrentWindow();
        if (currentWindow) {
            currentWindow.focus();
        }
    }

    public isFocused() {
        const currentWindow = remote.getCurrentWindow();
        if (currentWindow) {
            return currentWindow.isFocused();
        } else {
            return false;
        }
    }

    public showInactive() {
        const currentWindow = remote.getCurrentWindow();
        if (currentWindow) {
            currentWindow.showInactive();
        }
    }

    public hide() {
        const currentWindow = remote.getCurrentWindow();
        if (currentWindow) {
            currentWindow.hide();
        }
    }

    public show() {
        const currentWindow = remote.getCurrentWindow();
        if (currentWindow) {
            currentWindow.show();
        }
    }
}

// const windowDecorated = {
//     isMax: false,
//     openURL(url: string) {
//         shell.openExternal(url);
//     },
//     flashFrame() {
//         ipcRenderer.send('flashFrame');
//     },
//     min() {
//         ipcRenderer.send('windowMin');
//     },
//     max() {
//         ipcRenderer.send('windowMax');
//     },
//     restore() {
//         ipcRenderer.send('windowRestore');
//     },
//     close() {
//         ipcRenderer.send('windowClose');
//     },
//     flashIcon() {
//         ipcRenderer.send('flashIcon');
//     },
//     clearFlashIcon() {
//         ipcRenderer.send('clearFlashIcon');
//     },
// };
export default new WindowDecorated();
