// tslint:disable-next-line:no-var-requires
const request = require('request');
import fs from 'fs';

export default class NodeFileDownload {

    public downloadFile(url: string,
                        targetPath: string,
                        onEnd: () => void,
                        onProgress: (total: number, loaded: number) => void,
                        onSpeed?: (size: number, millisecond: number) => void) {
        // Save variable to know progress
        let loaded = 0;
        let total = 0;


        let lastTime = 0;

        const req = request({
            method: 'GET',
            uri: url,
        });

        const out = fs.createWriteStream(targetPath);
        req.pipe(out);

        req.on('response', (data: { headers: { [x: string]: string; }; }) => {
            // Change the total bytes value to get progress later.
            // tslint:disable-next-line:radix
            total = parseInt(data.headers['content-length']);
        });

        const hasSpeed = (typeof onSpeed === 'function');
        const hasProgress = (typeof onProgress === 'function');

        req.on('data', (chunk: string | any[]) => {
            // Update the received bytes
            loaded += chunk.length;
            const size = chunk.length;
            const time = new Date().getTime();
            if (lastTime === 0) {
                lastTime = time;
            } else {
                const v = time - lastTime;
                lastTime = time;
                if (hasSpeed && onSpeed) {
                    onSpeed(size, v);
                }
            }
            if (hasProgress && onProgress) {
                onProgress(total, loaded);
            }
        });

        req.on('end', () => {
            if (typeof onEnd === 'function' && onEnd) {
                onEnd();
            }
        });
    }
}
